import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
export declare class AdminService {
    private readonly prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(name: string, password: string): Promise<{
        access_token: string;
        name: string;
    }>;
    getReferralCount(): Promise<number>;
    getBalance(): Promise<number>;
    getTopReferrals(): Promise<{
        id: number;
        fullname: string;
        email: string;
        phone_number: string;
        password: string;
        gender: string;
        age: number;
        city: string;
        balance: number;
        referral_link: string;
        created_at: Date;
    }[]>;
    getUsers(page: number): Promise<any>;
    getProducts(page: number): Promise<any>;
    getNewUsers(): Promise<{
        thisMonth: any[];
        lastMonth: any[];
    }>;
    getRate(): Promise<number>;
    changeRate(rate: number): Promise<number>;
}
