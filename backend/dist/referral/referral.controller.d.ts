import { ReferralService } from './referral.service';
import { CreateReferralDto } from './dto/create-referral.dto';
export declare class ReferralController {
    private readonly referralService;
    constructor(referralService: ReferralService);
    create(createReferralDto: CreateReferralDto): unknown;
    findAll(user_id: string): unknown;
    findOne(id: number): unknown;
    deleteOne(id: number): unknown;
}
