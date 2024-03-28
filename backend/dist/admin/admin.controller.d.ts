import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    login(body: any): Promise<{
        access_token: string;
        name: string;
    }>;
    getReferralCount(): Promise<number>;
    getBalance(): Promise<number>;
    getTopReferrals(): Promise<{
        id: number;
        fullname: string;
        email: string;
        phone_number: string;
        password: string;
        gender: string;
        age: number;
        city: string;
        balance: number;
        referral_link: string;
        created_at: Date;
    }[]>;
    getUsers(page: number): Promise<any>;
    getProducts(page: number): Promise<any>;
    getNewUsers(): Promise<{
        thisMonth: any[];
        lastMonth: any[];
    }>;
}
