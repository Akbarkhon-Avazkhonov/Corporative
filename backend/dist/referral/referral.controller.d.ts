import { ReferralService } from './referral.service';
import { CreateReferralDto } from './dto/create-referral.dto';
export declare class ReferralController {
    private readonly referralService;
    constructor(referralService: ReferralService);
    create(createReferralDto: CreateReferralDto): Promise<{
        id: number;
        title: string;
        category_id: number;
        product_id: number;
        user_id: number;
        url_link: string;
        created_at: Date;
    }>;
    findAll(user_id: string): Promise<{
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
