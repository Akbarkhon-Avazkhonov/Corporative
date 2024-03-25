import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/auth-product.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerUser(body: CreateUserDto): Promise<{
        access_token: any;
        user_id: any;
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        access_token: any;
        user_id: any;
    }>;
    getProfile(headers: any, req: any): Promise<{
        user_id: any;
        email: string;
        balance: any;
    }>;
}
