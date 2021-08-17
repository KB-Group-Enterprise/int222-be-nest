import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from 'src/users/entities/users.entity';
import { AuthService } from './auth.service';

type token = {
  access_token: string;
  refresh_token: string;
};

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @UseGuards(AuthGuard('local'))
  public login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): string {
    const access_token = this.authService.generateToken(req.user as User);
    const tokens = {
      access_token,
      refresh_token: '',
    };
    res.cookie('auth-token', tokens, { httpOnly: true });
    return 'login success';
  }
}
