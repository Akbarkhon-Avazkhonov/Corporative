import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      throw new UnauthorizedException(
        'Missing or invalid Authorization header',
      );
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString(
      'ascii',
    );
    const [username, password] = credentials.split(':');

    if (this.validateUser(username, password)) {
      return true;
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  validateUser(username: string, password: string): boolean {
    // Replace with actual user validation logic
    const validUsername = process.env.BASIC_AUTH;
    const validPassword = process.env.BASIC_PASSWORD;

    return username === validUsername && password === validPassword;
  }
}
