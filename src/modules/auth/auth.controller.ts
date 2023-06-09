
import {
  Controller,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signIn(@Request() req): Promise<{ access_token: string }> {
    return this.authService.login(req.user);
  }
}
