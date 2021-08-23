import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
  ) {
    super({
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_ACCESS_TOKEN'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const access_token = req?.cookies['act'];
          if (access_token) {
            return access_token;
          }
        },
      ]),
    });
  }
  async validate(payload: { sub: string; username: string }): Promise<User> {
    const user = await this.userService.findUserByUsername(payload.username);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
