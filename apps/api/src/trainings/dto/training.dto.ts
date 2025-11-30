import { IsString, IsDateString, IsOptional, IsEnum, IsInt, Min, Max } from 'class-validator';
import { TrainingIntensity, AttendanceStatus } from '@repo/database';

export class CreateTrainingDto {
    @IsString()
    teamId: string;

    @IsDateString()
    date: string;

    @IsDateString()
    startTime: string;

    @IsDateString()
    endTime: string;

    @IsString()
    @IsOptional()
    location?: string;

    @IsString()
    @IsOptional()
    surface?: string;

    @IsString()
    @IsOptional()
    theme?: string;

    @IsEnum(TrainingIntensity)
    @IsOptional()
    intensityTarget?: TrainingIntensity;
}

export class UpdateTrainingDto {
    @IsDateString()
    @IsOptional()
    date?: string;

    @IsDateString()
    @IsOptional()
    startTime?: string;

    @IsDateString()
    @IsOptional()
    endTime?: string;

    @IsString()
    @IsOptional()
    location?: string;

    @IsString()
    @IsOptional()
    surface?: string;

    @IsString()
    @IsOptional()
    theme?: string;

    @IsEnum(TrainingIntensity)
    @IsOptional()
    intensityTarget?: TrainingIntensity;
}

export class CreateAttendanceDto {
    @IsString()
    trainingId: string;

    @IsString()
    playerId: string;

    @IsEnum(AttendanceStatus)
    status: AttendanceStatus;

    @IsInt()
    @Min(0)
    @IsOptional()
    lateMinutes?: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    leftEarlyMinutes?: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    minutesEffective?: number;
}

export class CreateRpeDto {
    @IsString()
    trainingId: string;

    @IsString()
    playerId: string;

    @IsInt()
    @Min(1)
    @Max(10)
    rpeValue: number;
}
