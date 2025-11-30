import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';
import { Role } from '@repo/database';

export class LoginDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;
}

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    passwordHash: string;

    @IsEnum(Role)
    role?: Role;
}
