import { Controller, Post, Body, Request, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@repo/database';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() req: any) {
        // In a real app, use a DTO and validation pipe
        const user = await this.authService.validateUser(req.email, req.password);
        if (!user) {
            return { error: 'Invalid credentials' };
        }
        return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() data: Prisma.UserCreateInput) {
        return this.authService.register(data);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req: any) {
        return req.user;
    }
}
