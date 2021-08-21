import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import { UserOutput } from 'src/users/dto/outputs/user.output';
import { User } from 'src/users/entities/users.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user';
import { CredentialInput } from './dto/inputs/credential.input';
import { RegisterInput } from './dto/inputs/register.input';
import { GqlAuthGuard } from './guards/gql-guard';
import { RefreshAuthGuard } from './guards/refresh-guard';

const accessTokenOption = {
  httpOnly: true,
  maxAge: 1000 * 60 * 15,
};
const refreshTokenOption = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24 * 7,
};
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
    res.cookie('act', access_token, accessTokenOption);
    res.cookie('rft', refresh_token, refreshTokenOption);
    return 'Login success';
  }

  @Mutation((returns) => String)
  async register(
    // @Context() context: any,
    @Args('registerData') registerData: RegisterInput,
  ): Promise<string> {
    await this.authService.register(registerData);
    // const res = context.res as Response;
    // const access_token = await this.authService.generateToken(user);
    // const refresh_token = await this.authService.generateRefreshToken(
    //   user.userId,
    // );
    // res.cookie('rft', refresh_token, { httpOnly: true });
    // res.cookie('act', access_token, accessTokenOption);
    return 'Register success';
  }
  @Mutation((returns) => Boolean)
  @UseGuards(RefreshAuthGuard)
  async refreshToken(@Context() context: any) {
    const req = context.req as any;
    const res = context.res as Response;
    const user = req.user as User;
    if (!user) return false;
    const access_token = await this.authService.generateToken(user);
    res.cookie('act', access_token, accessTokenOption);
    return true;
  }
  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => UserOutput)
  async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Boolean)
  async logout(@CurrentUser() user: User): Promise<boolean> {
    return await this.authService.invokeRefreshToken(user.userId);
  }
}
