import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class BasicAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
    validateUser(username: string, password: string): boolean;
}
