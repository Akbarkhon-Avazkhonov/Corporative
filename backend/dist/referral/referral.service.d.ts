import { CreateReferralDto } from './dto/create-referral.dto';
import { PrismaService } from 'src/prisma.service';
export declare class ReferralService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createReferralDto: CreateReferralDto): unknown;
    findAll(user_id: number): unknown;
    findOne(id: number): unknown;
    deleteOne(id: number): unknown;
}
