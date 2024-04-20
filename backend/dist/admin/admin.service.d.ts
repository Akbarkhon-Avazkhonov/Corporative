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
    getTopReferrals(): Promise<any>;
    getUsers(page: number): Promise<{
        users: any;
        count: number;
    }>;
    getProducts(page: number): Promise<{
        products: any;
        count: number;
    }>;
    getNewUsers(): Promise<{
        thisMonth: any[];
        lastMonth: any[];
    }>;
    getRate(): Promise<number>;
    changeRate(rate: number): Promise<number>;
}
