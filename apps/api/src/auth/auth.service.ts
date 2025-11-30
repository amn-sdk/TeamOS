import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from '@repo/database';

interface UserPayload {
    id: string;
    email: string;
    role: string;
}

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<Omit<User, 'passwordHash'> | null> {
        const user = await this.usersService.findOne(email);
        if (user && (await bcrypt.compare(pass, user.passwordHash))) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { passwordHash, ...result } = user;
            return result;
        }
        return null;
    }

    login(user: UserPayload) {
        const payload = { email: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            }
        };
    }

    async register(data: Prisma.UserCreateInput) {
        // Check if user exists first
        const existing = await this.usersService.findOne(data.email);
        if (existing) {
            throw new UnauthorizedException('User already exists');
        }
        const user = await this.usersService.create(data);
        return this.login(user);
    }
}
