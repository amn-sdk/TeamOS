import { IsString, IsOptional, IsEnum, IsDateString, IsInt, Min, Max } from 'class-validator';
import { PlayerStatus, Foot } from '@repo/database';

export class CreatePlayerDto {
    @IsString()
    teamId: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsDateString()
    @IsOptional()
    birthdate?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    parentContact?: string;

    @IsEnum(PlayerStatus)
    @IsOptional()
    status?: PlayerStatus;
}

export class UpdatePlayerDto {
    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsDateString()
    @IsOptional()
    birthdate?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    parentContact?: string;

    @IsEnum(PlayerStatus)
    @IsOptional()
    status?: PlayerStatus;
}

export class CreatePlayerProfileDto {
    @IsString()
    @IsOptional()
    mainPosition?: string;

    @IsString()
    @IsOptional()
    secondaryPosition?: string;

    @IsEnum(Foot)
    @IsOptional()
    foot?: Foot;

    @IsInt()
    @Min(100)
    @Max(250)
    @IsOptional()
    heightCm?: number;

    @IsInt()
    @Min(30)
    @Max(200)
    @IsOptional()
    weightKg?: number;

    @IsInt()
    @Min(1)
    @Max(99)
    @IsOptional()
    shirtNumber?: number;

    @IsString()
    @IsOptional()
    jerseySize?: string;

    @IsString()
    @IsOptional()
    shortSize?: string;

    @IsString()
    @IsOptional()
    sockSize?: string;
}
