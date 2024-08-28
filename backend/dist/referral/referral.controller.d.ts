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
    findAll(req: any): Promise<({
        Orders: {
            status: import(".prisma/client").$Enums.OrderStatus;
        }[];
        _count: {
            Orders: number;
        };
    } & {
        id: number;
        title: string;
        product_id: number;
        user_id: number;
        url_link: string;
        created_at: Date;
    })[]>;
    findOne(id: number, req: any): Promise<{
        orders: {
            NEW: number;
            IN_PROGRESS: number;
            DONE: number;
            TRASH: number;
            REJECTED: number;
        };
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
