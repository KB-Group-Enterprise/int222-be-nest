import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(username: string, password: string): Promise<User> {
    const user = await this.userService.findUserByUsername(username);
    if (!user) throw new UnauthorizedException("Your username doesn't exist");
    const verifiedPassword = this.userService.verifyPassword(password, user);
    if (!verifiedPassword)
      throw new UnauthorizedException('Your username or password is wrong');
    return user;
  }
  async generateToken(user: User): Promise<string> {
    const payload = {
      sub: user.userId,
      username: user.username,
    };
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
    });
  }
}
