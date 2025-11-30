import { Controller, Post, Body, Request, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@repo/database';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/auth.dto';

interface RequestWithUser extends Request {
    user: {
        userId: string;
        email: string;
        role: string;
    };
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
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
    getProfile(@Request() req: RequestWithUser) {
        return req.user;
    }
}
