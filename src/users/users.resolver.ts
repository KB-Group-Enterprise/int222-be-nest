import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { Response } from 'express';
import { CurrentRequest } from 'src/auth/current-request';
import { GqlAuthGuard } from 'src/auth/guards/gql-guard';
import { UserArgs } from './dto/args/user.args';
import { RegisterInput } from '../auth/dto/inputs/register.input';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Query((returns) => [User])
  async users(): Promise<User[]> {
    return await this.userService.getAllUser();
  }
  @UseGuards(GqlAuthGuard)
  @Query((returns) => User)
  async user(
    @CurrentRequest() req: Response,
    @Context() context: any,
    @Args() userArgs: UserArgs,
  ): Promise<User> {
    // console.log(context.res);
    return await this.userService.findUserByUsername(userArgs.username);
  }
  @Mutation((returns) => User)
  async createUser(
    @Args('createUserData') createUserData: RegisterInput,
  ): Promise<User> {
    const newUser = await this.userService.createUser(createUserData);
    return newUser;
  }
}
