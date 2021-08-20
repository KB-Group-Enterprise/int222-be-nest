import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import * as randomToken from 'rand-token';
import { RegisterInput } from './dto/inputs/register.input';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async register(registerInput: RegisterInput): Promise<User> {
    const user = await this.userService.createUser(registerInput);
    return user;
  }
  async login(username: string, password: string): Promise<User> {
    const user = await this.userService.findUserByUsername(username);
    if (!user) throw new UnauthorizedException("Your username doesn't exist");
    const verifiedPassword = await this.userService.verifyPassword(
      password,
      user,
    );
    if (!verifiedPassword)
      throw new UnauthorizedException('Your username or password invalid');
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
  async generateRefreshToken(userId: string): Promise<string> {
    const refreshToken = randomToken.generate(16);
    const today = new Date();
    today.setDate(today.getDate() + 7);
    const refreshTokenExp = today.getTime();
    await this.userService.findUserByIdAndUpdate(userId, {
      refreshToken,
      refreshTokenExp,
    });
    return refreshToken;
  }
  async validateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<User> {
    const user = this.userService.findUserByUserIdAndRefreshToken(
      userId,
      refreshToken,
    );
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
