import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/auth-product.dto';
export declare class AuthService {
    private readonly prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    createUser(body: CreateUserDto): unknown;
    login(email: string, password: string): unknown;
    getProfile(email: string): unknown;
}
