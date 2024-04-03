import { ReferralService } from './referral.service';
import { CreateReferralDto } from './dto/create-referral.dto';
export declare class ReferralController {
    private readonly referralService;
    constructor(referralService: ReferralService);
    create(createReferralDto: CreateReferralDto, req: any): Promise<{
        id: number;
        title: string;
        product_id: number;
        user_id: number;
        url_link: string;
        created_at: Date;
    }>;
    findAll(req: any): Promise<{
        id: number;
        title: string;
        product_id: number;
        user_id: number;
        url_link: string;
        created_at: Date;
    }[]>;
    findOne(id: number, req: any): Promise<{
        id: number;
        title: string;
        product_id: number;
        user_id: number;
        url_link: string;
        created_at: Date;
    }>;
    deleteOne(id: number, req: any): Promise<{
        id: number;
        title: string;
        product_id: number;
        user_id: number;
        url_link: string;
        created_at: Date;
    }>;
}
