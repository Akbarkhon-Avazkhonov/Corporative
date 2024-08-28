import { PrismaService } from 'src/prisma.service';
export declare class ProfileService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(user_id: number, images: any, info: any): Promise<{
        id: number;
        user_id: number;
        info: import(".prisma/client").Prisma.JsonValue;
        images: string[];
    }>;
    findAll(): Promise<({
        user: {
            _count: {
                Links: number;
            };
        } & {
            id: number;
            fullname: string;
            email: string;
            phone_number: string;
            password: string;
            gender: string;
            isVerified: boolean;
            age: number;
            city: string;
            balance: number;
            referral_link: string;
            created_at: Date;
        };
    } & {
        id: number;
        user_id: number;
        info: import(".prisma/client").Prisma.JsonValue;
        images: string[];
    })[]>;
    findOne(user_id: number): Promise<{
        user: {
            id: number;
            fullname: string;
            email: string;
            phone_number: string;
            password: string;
            gender: string;
            isVerified: boolean;
            age: number;
            city: string;
            balance: number;
            referral_link: string;
            created_at: Date;
        };
    } & {
        id: number;
        user_id: number;
        info: import(".prisma/client").Prisma.JsonValue;
        images: string[];
    }>;
    update(id: number, isVerified: any): Promise<{
        id: number;
        fullname: string;
        email: string;
        phone_number: string;
        password: string;
        gender: string;
        isVerified: boolean;
        age: number;
        city: string;
        balance: number;
        referral_link: string;
        created_at: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        user_id: number;
        info: import(".prisma/client").Prisma.JsonValue;
        images: string[];
    }>;
}
