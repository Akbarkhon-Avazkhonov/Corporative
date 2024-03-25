import { CreateReferralDto } from './dto/create-referral.dto';
import { PrismaService } from 'src/prisma.service';
export declare class ReferralService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createReferralDto: CreateReferralDto): Promise<any>;
    findAll(user_id: number): Promise<any>;
    findOne(id: number): Promise<any>;
    deleteOne(id: number): Promise<any>;
}
