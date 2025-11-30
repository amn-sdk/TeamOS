import { IsString, IsEnum, IsOptional, IsDateString, IsInt, Min, Max } from 'class-validator';
import { MatchType, HomeAway, LineupRole, MatchEventType } from '@repo/database';

export class CreateMatchDto {
    @IsString()
    teamId: string;

    @IsString()
    seasonId: string;

    @IsString()
    @IsOptional()
    competition?: string;

    @IsEnum(MatchType)
    matchType: MatchType;

    @IsEnum(HomeAway)
    homeAway: HomeAway;

    @IsString()
    opponentName: string;

    @IsDateString()
    date: string;

    @IsDateString()
    startTime: string;

    @IsString()
    @IsOptional()
    location?: string;

    @IsInt()
    @Min(0)
    @IsOptional()
    scoreFor?: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    scoreAgainst?: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    htScoreFor?: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    htScoreAgainst?: number;
}

export class UpdateMatchDto {
    @IsString()
    @IsOptional()
    competition?: string;

    @IsEnum(MatchType)
    @IsOptional()
    matchType?: MatchType;

    @IsString()
    @IsOptional()
    opponentName?: string;

    @IsDateString()
    @IsOptional()
    date?: string;

    @IsDateString()
    @IsOptional()
    startTime?: string;

    @IsString()
    @IsOptional()
    location?: string;

    @IsInt()
    @Min(0)
    @IsOptional()
    scoreFor?: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    scoreAgainst?: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    htScoreFor?: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    htScoreAgainst?: number;
}

export class CreateLineupDto {
    @IsString()
    matchId: string;

    @IsString()
    playerId: string;

    @IsEnum(LineupRole)
    role: LineupRole;

    @IsString()
    @IsOptional()
    position?: string;

    @IsInt()
    @Min(0)
    @IsOptional()
    minutesPlayed?: number;

    @IsInt()
    @Min(0)
    @Max(10)
    @IsOptional()
    rating?: number;
}

export class CreateEventDto {
    @IsString()
    matchId: string;

    @IsInt()
    @Min(0)
    minute: number;

    @IsEnum(MatchEventType)
    eventType: MatchEventType;

    @IsString()
    @IsOptional()
    playerMainId?: string;

    @IsString()
    @IsOptional()
    playerSecondaryId?: string;
}

export class UpdateStatsDto {
    @IsInt()
    @Min(0)
    @IsOptional()
    goals?: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    assists?: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    yellowCards?: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    redCards?: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    penaltiesScored?: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    penaltiesMissed?: number;
}
