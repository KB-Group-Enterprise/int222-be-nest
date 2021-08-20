import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/entities/users.entity';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {
    super({
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const access_token = req?.cookies['act'];
          if (access_token) return access_token;
        },
      ]),
    });
  }
  async validate(
    req: Request,
    payload: { username: string; sub: string },
  ): Promise<User> {
    const refresh_token = req?.cookies['rft'];
    if (!refresh_token) throw new UnauthorizedException();

    const user = await this.authService.validateRefreshToken(
      payload.sub,
      refresh_token,
    );
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
