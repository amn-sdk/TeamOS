import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrainingDto, UpdateTrainingDto, CreateAttendanceDto, CreateRpeDto } from './dto/training.dto';

@Injectable()
export class TrainingsService {
    constructor(private prisma: PrismaService) { }

    async create(createTrainingDto: CreateTrainingDto) {
        return this.prisma.training.create({
            data: {
                ...createTrainingDto,
                date: new Date(createTrainingDto.date),
                startTime: new Date(createTrainingDto.startTime),
                endTime: new Date(createTrainingDto.endTime),
            },
            include: {
                team: true,
                exercises: {
                    include: { exercise: true },
                    orderBy: { orderIndex: 'asc' },
                },
            },
        });
    }

    async findAll(teamId?: string, startDate?: string, endDate?: string) {
        const where: any = {};

        if (teamId) {
            where.teamId = teamId;
        }

        if (startDate || endDate) {
            where.date = {};
            if (startDate) where.date.gte = new Date(startDate);
            if (endDate) where.date.lte = new Date(endDate);
        }

        return this.prisma.training.findMany({
            where,
            include: {
                team: true,
                attendance: {
                    include: { player: true },
                },
                exercises: {
                    include: { exercise: true },
                    orderBy: { orderIndex: 'asc' },
                },
            },
            orderBy: { date: 'desc' },
        });
    }

    async findOne(id: string) {
        const training = await this.prisma.training.findUnique({
            where: { id },
            include: {
                team: true,
                exercises: {
                    include: { exercise: true },
                    orderBy: { orderIndex: 'asc' },
                },
                attendance: {
                    include: { player: { include: { profile: true } } },
                },
                rpe: {
                    include: { player: true },
                },
            },
        });

        if (!training) {
            throw new NotFoundException(`Training with ID ${id} not found`);
        }

        return training;
    }

    async update(id: string, updateTrainingDto: UpdateTrainingDto) {
        const training = await this.prisma.training.findUnique({ where: { id } });
        if (!training) {
            throw new NotFoundException(`Training with ID ${id} not found`);
        }

        return this.prisma.training.update({
            where: { id },
            data: {
                ...updateTrainingDto,
                date: updateTrainingDto.date ? new Date(updateTrainingDto.date) : undefined,
                startTime: updateTrainingDto.startTime ? new Date(updateTrainingDto.startTime) : undefined,
                endTime: updateTrainingDto.endTime ? new Date(updateTrainingDto.endTime) : undefined,
            },
            include: {
                team: true,
                exercises: {
                    include: { exercise: true },
                },
            },
        });
    }

    async remove(id: string) {
        const training = await this.prisma.training.findUnique({ where: { id } });
        if (!training) {
            throw new NotFoundException(`Training with ID ${id} not found`);
        }

        return this.prisma.training.delete({ where: { id } });
    }

    // Attendance management
    async recordAttendance(createAttendanceDto: CreateAttendanceDto) {
        // Check if attendance record already exists
        const existing = await this.prisma.trainingAttendance.findFirst({
            where: {
                trainingId: createAttendanceDto.trainingId,
                playerId: createAttendanceDto.playerId,
            },
        });

        if (existing) {
            // Update existing record
            return this.prisma.trainingAttendance.update({
                where: { id: existing.id },
                data: createAttendanceDto,
                include: { player: true, training: true },
            });
        }

        return this.prisma.trainingAttendance.create({
            data: createAttendanceDto,
            include: { player: true, training: true },
        });
    }

    async getAttendance(trainingId: string) {
        return this.prisma.trainingAttendance.findMany({
            where: { trainingId },
            include: {
                player: {
                    include: { profile: true },
                },
            },
        });
    }

    // RPE management
    async recordRpe(createRpeDto: CreateRpeDto) {
        // Check if RPE already exists
        const existing = await this.prisma.trainingRpe.findFirst({
            where: {
                trainingId: createRpeDto.trainingId,
                playerId: createRpeDto.playerId,
            },
        });

        if (existing) {
            return this.prisma.trainingRpe.update({
                where: { id: existing.id },
                data: { rpeValue: createRpeDto.rpeValue },
                include: { player: true, training: true },
            });
        }

        return this.prisma.trainingRpe.create({
            data: createRpeDto,
            include: { player: true, training: true },
        });
    }

    async getRpe(trainingId: string) {
        return this.prisma.trainingRpe.findMany({
            where: { trainingId },
            include: { player: true },
        });
    }

    async getPlayerStats(playerId: string) {
        const attendances = await this.prisma.trainingAttendance.findMany({
            where: { playerId },
            include: { training: true },
            orderBy: { training: { date: 'desc' } },
        });

        const totalTrainings = attendances.length;
        const present = attendances.filter(a => a.status === 'PRESENT').length;
        const absent = attendances.filter(a => a.status === 'ABSENT').length;
        const excused = attendances.filter(a => a.status === 'EXCUSE').length;

        return {
            totalTrainings,
            present,
            absent,
            excused,
            attendanceRate: totalTrainings > 0 ? (present / totalTrainings) * 100 : 0,
            recentAttendances: attendances.slice(0, 10),
        };
    }
}
