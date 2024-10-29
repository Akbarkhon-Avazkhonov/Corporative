/// <reference types="multer" />
import { ProfileService } from './profile.service';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    create(req: any, files: Express.Multer.File[], body: any): Promise<{
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
    findSome(take: number, skip: number): Promise<({
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
    findOne(id: string): Promise<{
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
    update(id: string, body: any): Promise<{
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
    remove(id: string): Promise<{
        id: number;
        user_id: number;
        info: import(".prisma/client").Prisma.JsonValue;
        images: string[];
    }>;
}
