// src/auth/auth.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-guard.auth';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly authGuard = new JwtAuthGuard();

  async use(req: any, res: any, next: () => void) {
    await this.authGuard.canActivate({
      switchToHttp: () => ({ getRequest: () => req, getResponse: () => res }),
    } as any);

    next();
  }
}
