import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { ForgotPasswordInput } from './dto/inputs/forget-password.input';
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
      secret: this.configService.get('JWT_ACCESS_TOKEN'),
      expiresIn: '15min',
    });
  }
  async generateRefreshToken(userId: string): Promise<string> {
    const user = await this.userService.findUserByUserId(userId);
    if (!user) throw new NotFoundException('UserId invalid');
    const payload = {
      count: user.refreshTokenCount,
      sub: userId,
    };
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN'),
      expiresIn: '7d',
    });
    return refreshToken;
  }
  async validateRefreshToken(userId: string, count: number): Promise<User> {
    const user = await this.userService.findUserByUserId(userId);
    if (!user) throw new UnauthorizedException();
    if (user.refreshTokenCount !== count) throw new UnauthorizedException();
    return user;
  }

  async invokeRefreshToken(userId: string): Promise<boolean> {
    const user = await this.userService.findUserByUserId(userId);
    if (!user) return false;
    user.refreshTokenCount += 1;
    await this.userService.findUserByIdAndUpdate(userId, {
      refreshTokenCount: user.refreshTokenCount,
    });
    return true;
  }

  async changePassword(data: ForgotPasswordInput): Promise<void> {
    const isInvokeRefreshToken = await this.invokeRefreshToken(data.userId);
    if (isInvokeRefreshToken) await this.userService.forgotPassword(data);
    else {
      throw new BadRequestException('Something wrong with your information');
    }
  }
}
