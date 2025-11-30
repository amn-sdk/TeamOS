import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlayerDto, UpdatePlayerDto, CreatePlayerProfileDto } from './dto/player.dto';

@Injectable()
export class PlayersService {
    constructor(private prisma: PrismaService) { }

    async create(createPlayerDto: CreatePlayerDto) {
        return this.prisma.player.create({
            data: {
                ...createPlayerDto,
                birthdate: createPlayerDto.birthdate ? new Date(createPlayerDto.birthdate) : undefined,
            },
            include: {
                profile: true,
                team: true,
            },
        });
    }

    async findAll(teamId?: string) {
        return this.prisma.player.findMany({
            where: teamId ? { teamId } : undefined,
            include: {
                profile: true,
                team: true,
                licenses: {
                    take: 1,
                },
            },
            orderBy: { lastName: 'asc' },
        });
    }

    async findOne(id: string) {
        const player = await this.prisma.player.findUnique({
            where: { id },
            include: {
                profile: true,
                team: true,
                licenses: {
                    include: { documents: true },
                },
                injuries: {
                    orderBy: { dateInjury: 'desc' },
                    take: 5,
                },
                payments: {
                    include: { schedules: true },
                },
                trainingAttendance: {
                    include: { training: true },
                    orderBy: { training: { date: 'desc' } },
                    take: 10,
                },
                matchStats: {
                    include: { match: true },
                    orderBy: { match: { date: 'desc' } },
                    take: 10,
                },
            },
        });

        if (!player) {
            throw new NotFoundException(`Player with ID ${id} not found`);
        }

        return player;
    }

    async update(id: string, updatePlayerDto: UpdatePlayerDto) {
        const player = await this.prisma.player.findUnique({ where: { id } });
        if (!player) {
            throw new NotFoundException(`Player with ID ${id} not found`);
        }

        return this.prisma.player.update({
            where: { id },
            data: {
                ...updatePlayerDto,
                birthdate: updatePlayerDto.birthdate ? new Date(updatePlayerDto.birthdate) : undefined,
            },
            include: {
                profile: true,
                team: true,
            },
        });
    }

    async remove(id: string) {
        const player = await this.prisma.player.findUnique({ where: { id } });
        if (!player) {
            throw new NotFoundException(`Player with ID ${id} not found`);
        }

        return this.prisma.player.delete({ where: { id } });
    }

    async createProfile(playerId: string, createProfileDto: CreatePlayerProfileDto) {
        // Check if player exists
        const player = await this.prisma.player.findUnique({ where: { id: playerId } });
        if (!player) {
            throw new NotFoundException(`Player with ID ${playerId} not found`);
        }

        // Delete existing profile if any
        await this.prisma.playerProfile.deleteMany({ where: { playerId } });

        return this.prisma.playerProfile.create({
            data: {
                ...createProfileDto,
                playerId,
            },
        });
    }

    async updateProfile(playerId: string, updateProfileDto: CreatePlayerProfileDto) {
        const profile = await this.prisma.playerProfile.findUnique({ where: { playerId } });

        if (!profile) {
            return this.createProfile(playerId, updateProfileDto);
        }

        return this.prisma.playerProfile.update({
            where: { playerId },
            data: updateProfileDto,
        });
    }
}
