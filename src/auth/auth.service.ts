import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<User> {
    const user = await this.userService.findUserByUsername(username);
    if (!user) throw new UnauthorizedException("Your username doesn't exist");
    const verifiedPassword = this.userService.verifyPassword(password, user);
    if (!verifiedPassword)
      throw new UnauthorizedException('Your username or password is wrong');
    return user;
  }
  generateToken(user: User): string {
    const payload = {
      sub: user.userId,
      username: user.username,
    };
    return this.jwtService.sign(payload);
  }
}
