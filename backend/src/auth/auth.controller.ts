import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenResponse } from './types/auth.types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() body: { email: string; password: string },
  ): Promise<TokenResponse> {
    return this.authService.signup(body.email, body.password);
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
  ): Promise<TokenResponse> {
    return this.authService.login(body.email, body.password);
  }
  //   @Post('check-auth')
  //   @UseGuards(JwtAuthGuard)
  //   checkAuth(@Req() req) {
  //     return { message: 'User authenticated', user: req.user };
  //   }
}
