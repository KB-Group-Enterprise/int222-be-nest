import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UserResponse } from 'src/users/dto/outputs/UserResponse';
import { User } from 'src/users/entities/users.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user';
import { CredentialInput } from './dto/inputs/credential.input';
import { ForgotPasswordInput } from './dto/inputs/forget-password.input';
import { RegisterInput } from './dto/inputs/register.input';
import { JwtAuthGuard } from './guards/jwt-guard';

const accessTokenOption = {
  httpOnly: true,
  maxAge: 1000 * 60 * 15,
};
const refreshTokenOption = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24 * 30,
};

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  public async register(@Body() registerInput: RegisterInput) {
    await this.authService.register(registerInput);
    return 'Register Complete';
  }
  @Post('/login')
  public async login(
    @Body() { username, password }: CredentialInput,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.login(username, password);
    const access_token = await this.authService.generateToken(user);
    const refresh_token = await this.authService.generateRefreshToken(
      user.userId,
    );
    return {
      token: access_token,
      refresh_token: refresh_token,
    };
  }
  @Post('/refresh_token')
  @UseGuards(AuthGuard('refresh'))
  public async refreshToken(@CurrentUser() user: User) {
    if (!user) return false;
    const access_token = await this.authService.generateToken(user);
    return {
      token: access_token,
    };
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  public async me(@CurrentUser() user: User) {
    const response = new UserResponse(user);
    return {
      data: response,
    };
  }
  @Post('/logout')
  async logout(@Res({ passthrough: true }) res: Response): Promise<boolean> {
    res.clearCookie('act');
    res.clearCookie('rft');
    return true;
  }
  @Post('/forgot_password')
  async forgotPassword(@Body() newData: ForgotPasswordInput): Promise<string> {
    await this.authService.changePassword(newData);
    return 'Reset Password success';
  }

  @Get('/secret')
  @UseGuards(JwtAuthGuard)
  async secret(@Req() req: Request) {
    return {
      secret: 'thisissecretdata',
    };
  }
}
