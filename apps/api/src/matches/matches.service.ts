import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMatchDto, UpdateMatchDto, CreateLineupDto, CreateEventDto, UpdateStatsDto } from './dto/match.dto';

@Injectable()
export class MatchesService {
    constructor(private prisma: PrismaService) { }

    async create(createMatchDto: CreateMatchDto) {
        return this.prisma.match.create({
            data: {
                ...createMatchDto,
                date: new Date(createMatchDto.date),
                startTime: new Date(createMatchDto.startTime),
            },
            include: {
                team: true,
                season: true,
            },
        });
    }

    async findAll(teamId?: string, seasonId?: string) {
        const where: any = {};

        if (teamId) where.teamId = teamId;
        if (seasonId) where.seasonId = seasonId;

        return this.prisma.match.findMany({
            where,
            include: {
                team: true,
                season: true,
                lineups: {
                    include: { player: true },
                },
            },
            orderBy: { date: 'desc' },
        });
    }

    async findOne(id: string) {
        const match = await this.prisma.match.findUnique({
            where: { id },
            include: {
                team: true,
                season: true,
                lineups: {
                    include: {
                        player: {
                            include: { profile: true },
                        },
                    },
                    orderBy: { role: 'asc' },
                },
                events: {
                    include: {
                        playerMain: true,
                    },
                    orderBy: { minute: 'asc' },
                },
                stats: {
                    include: { player: true },
                },
            },
        });

        if (!match) {
            throw new NotFoundException(`Match with ID ${id} not found`);
        }

        return match;
    }

    async update(id: string, updateMatchDto: UpdateMatchDto) {
        const match = await this.prisma.match.findUnique({ where: { id } });
        if (!match) {
            throw new NotFoundException(`Match with ID ${id} not found`);
        }

        return this.prisma.match.update({
            where: { id },
            data: {
                ...updateMatchDto,
                date: updateMatchDto.date ? new Date(updateMatchDto.date) : undefined,
                startTime: updateMatchDto.startTime ? new Date(updateMatchDto.startTime) : undefined,
            },
            include: {
                team: true,
                season: true,
            },
        });
    }

    async remove(id: string) {
        const match = await this.prisma.match.findUnique({ where: { id } });
        if (!match) {
            throw new NotFoundException(`Match with ID ${id} not found`);
        }

        return this.prisma.match.delete({ where: { id } });
    }

    // Lineup management
    async addLineup(createLineupDto: CreateLineupDto) {
        const existing = await this.prisma.matchLineup.findFirst({
            where: {
                matchId: createLineupDto.matchId,
                playerId: createLineupDto.playerId,
            },
        });

        if (existing) {
            return this.prisma.matchLineup.update({
                where: { id: existing.id },
                data: createLineupDto,
                include: { player: true, match: true },
            });
        }

        return this.prisma.matchLineup.create({
            data: createLineupDto,
            include: { player: true, match: true },
        });
    }

    async getLineup(matchId: string) {
        return this.prisma.matchLineup.findMany({
            where: { matchId },
            include: {
                player: {
                    include: { profile: true },
                },
            },
            orderBy: { role: 'asc' },
        });
    }

    // Events management
    async addEvent(createEventDto: CreateEventDto) {
        const event = await this.prisma.matchEvent.create({
            data: createEventDto,
            include: {
                match: true,
                playerMain: true,
            },
        });

        // Auto-update stats based on event
        if (createEventDto.playerMainId) {
            await this.updateStatsFromEvent(
                createEventDto.matchId,
                createEventDto.playerMainId,
                createEventDto.eventType,
            );
        }

        if (createEventDto.playerSecondaryId && createEventDto.eventType === 'BUT') {
            // Secondary player gets an assist
            await this.incrementStat(
                createEventDto.matchId,
                createEventDto.playerSecondaryId,
                'assists',
            );
        }

        return event;
    }

    private async updateStatsFromEvent(matchId: string, playerId: string, eventType: string) {
        const statField = {
            'BUT': 'goals',
            'CARTON_JAUNE': 'yellowCards',
            'CARTON_ROUGE': 'redCards',
        }[eventType];

        if (statField) {
            await this.incrementStat(matchId, playerId, statField);
        }
    }

    private async incrementStat(matchId: string, playerId: string, field: string) {
        const existing = await this.prisma.playerMatchStats.findFirst({
            where: { matchId, playerId },
        });

        if (existing) {
            await this.prisma.playerMatchStats.update({
                where: { id: existing.id },
                data: { [field]: { increment: 1 } },
            });
        } else {
            await this.prisma.playerMatchStats.create({
                data: {
                    matchId,
                    playerId,
                    [field]: 1,
                },
            });
        }
    }

    async getEvents(matchId: string) {
        return this.prisma.matchEvent.findMany({
            where: { matchId },
            include: {
                playerMain: true,
            },
            orderBy: { minute: 'asc' },
        });
    }

    // Stats management
    async updateStats(matchId: string, playerId: string, updateStatsDto: UpdateStatsDto) {
        const existing = await this.prisma.playerMatchStats.findFirst({
            where: { matchId, playerId },
        });

        if (existing) {
            return this.prisma.playerMatchStats.update({
                where: { id: existing.id },
                data: updateStatsDto,
                include: { player: true, match: true },
            });
        }

        return this.prisma.playerMatchStats.create({
            data: {
                matchId,
                playerId,
                ...updateStatsDto,
            },
            include: { player: true, match: true },
        });
    }

    async getStats(matchId: string) {
        return this.prisma.playerMatchStats.findMany({
            where: { matchId },
            include: { player: true },
        });
    }

    async getPlayerMatchHistory(playerId: string) {
        return this.prisma.playerMatchStats.findMany({
            where: { playerId },
            include: {
                match: true,
            },
            orderBy: {
                match: { date: 'desc' },
            },
        });
    }
}
