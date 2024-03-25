import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/auth-product.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerUser(body: CreateUserDto): unknown;
    login(body: {
        email: string;
        password: string;
    }): unknown;
    getProfile(headers: any, req: any): unknown;
}
