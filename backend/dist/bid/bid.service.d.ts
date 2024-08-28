import { CreateBidDto } from './dto/create-bid.dto';
import { PrismaService } from 'src/prisma.service';
export declare class BidService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    remove(id: number): Promise<{
        id: number;
        name: string;
        surname: string;
        phone: string;
        message: string;
        created_at: Date;
    }>;
}
