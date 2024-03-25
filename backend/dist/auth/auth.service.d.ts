import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/auth-product.dto';
export declare class AuthService {
    private readonly prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    createUser(body: CreateUserDto): Promise<{
        access_token: any;
        user_id: any;
    }>;
    login(email: string, password: string): Promise<{
        access_token: any;
        user_id: any;
    }>;
    getProfile(email: string): Promise<{
        user_id: any;
        email: string;
        balance: any;
    }>;
}
