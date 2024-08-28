import { BidService } from './bid.service';
import { CreateBidDto } from './dto/create-bid.dto';
export declare class BidController {
    private readonly bidService;
    constructor(bidService: BidService);
    create(createBidDto: CreateBidDto): Promise<{
        id: number;
        name: string;
        surname: string;
        phone: string;
        message: string;
        created_at: Date;
    }>;
    findAll(): Promise<{
        id: number;
        name: string;
        surname: string;
        phone: string;
        message: string;
        created_at: Date;
    }[]>;
    remove(id: string): Promise<{
        id: number;
        name: string;
        surname: string;
        phone: string;
        message: string;
        created_at: Date;
    }>;
}
