import { CreateReferralDto } from './dto/create-referral.dto';
import { PrismaService } from 'src/prisma.service';
export declare class ReferralService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createReferralDto: CreateReferralDto): Promise<{
        id: number;
        title: string;
        category_id: number;
        product_id: number;
        user_id: number;
        url_link: string;
        created_at: Date;
    }>;
    findAll(user_id: number): Promise<{
        id: number;
        title: string;
        category_id: number;
        product_id: number;
        user_id: number;
        url_link: string;
        created_at: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        title: string;
        category_id: number;
        product_id: number;
        user_id: number;
        url_link: string;
        created_at: Date;
    }>;
    deleteOne(id: number): Promise<{
        id: number;
        title: string;
        category_id: number;
        product_id: number;
        user_id: number;
        url_link: string;
        created_at: Date;
    }>;
}
