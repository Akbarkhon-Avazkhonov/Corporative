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
    getTopReferrals(): Promise<any>;
    getUsers(page: number): Promise<{
        users: any;
        count: number;
    }>;
    getProducts(page: number): Promise<{
        products: any;
        count: number;
    }>;
    getNewUsers(): Promise<{
        thisMonth: any[];
        lastMonth: any[];
    }>;
    getEcoinRate(): Promise<number>;
    changeEcoinRate(body: any): Promise<number>;
}
