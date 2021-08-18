import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from 'src/users/entities/users.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-guard';
import { LocalAuthGuard } from './guards/local-guard';

type token = {
  token: string;
};

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @UseGuards(LocalAuthGuard)
  public async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<token> {
    const access_token = await this.authService.generateToken(req.user as User);
    const refresh_token = '';
    const responseToken = {
      token: access_token,
    };
    res.cookie('rft', refresh_token, { httpOnly: true });
    return responseToken;
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: Request) {
    return req.user;
  }
}
