import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/auth-product.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerUser(body: CreateUserDto): Promise<{
        access_token: string;
        user_id: number;
    }>;
    sendPhoneCode(body: {
        phone_number: string;
    }): Promise<boolean>;
    verifyPhoneCode(body: {
        phone_number: string;
        code: number;
    }): Promise<boolean>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        user_id: number;
    }>;
    getProfile(req: any): Promise<{
        id: number;
        fullname: string;
        phone_number: string;
        email: string;
        balance: number;
    }>;
}
