import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/auth-product.dto';
export declare class AuthService {
    private readonly prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    createUser(body: CreateUserDto): Promise<{
        access_token: string;
        user_id: number;
    }>;
    login(email: string, password: string): Promise<{
        access_token: string;
        user_id: number;
    }>;
    getProfile(email: string): Promise<{
        user_id: number;
        email: string;
        balance: number;
    }>;
    sendPhoneCode(number: string): Promise<boolean>;
    verifyPhoneCode(number: string, code: number): Promise<boolean>;
    sendSMS(number: string, message: string): Promise<boolean>;
    getToken(): Promise<void>;
    getRandomSixDigitNumber(): Promise<number>;
}
