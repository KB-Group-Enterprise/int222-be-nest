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
      secretOrKey: configService.get('JWT_REFRESH_TOKEN'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req.body.refresh_token;
        },
      ]),
    });
  }
  async validate(payload: { count: number; sub: string }): Promise<User> {
    const user = await this.authService.validateRefreshToken(
      payload.sub,
      payload.count,
    );

    return user;
  }
}
