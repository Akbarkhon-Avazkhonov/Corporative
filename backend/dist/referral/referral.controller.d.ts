import { ReferralService } from './referral.service';
import { CreateReferralDto } from './dto/create-referral.dto';
export declare class ReferralController {
    private readonly referralService;
    constructor(referralService: ReferralService);
    create(createReferralDto: CreateReferralDto): Promise<any>;
    findAll(user_id: string): Promise<any>;
    findOne(id: number): Promise<any>;
    deleteOne(id: number): Promise<any>;
}
