import { HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import { User } from 'src/users/entities/users.entity';
import { AuthService } from './auth.service';
import { CredentialInput } from './dto/inputs/credential.input';
import { RegisterInput } from './dto/inputs/register.input';
@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => String)
  async login(
    @Context() context: any,
    @Args('credential') { username, password }: CredentialInput,
  ): Promise<string> {
    const user = await this.authService.login(username, password);
    const res = context.res as Response;
    const access_token = await this.authService.generateToken(user);
    const refresh_token = await this.authService.generateRefreshToken(
      user.userId,
    );
    res.cookie('rft', refresh_token, { httpOnly: true });
    res.cookie('act', access_token, { httpOnly: true });
    return 'Login success';
  }

  @Mutation((returns) => User)
  async register(
    @Context() context: any,
    @Args('registerData') registerData: RegisterInput,
  ): Promise<string> {
    const user = await this.authService.register(registerData);
    const res = context.res as Response;
    const access_token = await this.authService.generateToken(user);
    const refresh_token = await this.authService.generateRefreshToken(
      user.userId,
    );
    res
      .status(HttpStatus.CREATED)
      .cookie('rft', refresh_token, { httpOnly: true });
    res
      .status(HttpStatus.CREATED)
      .cookie('act', access_token, { httpOnly: true });
    return 'Register success';
  }
}
