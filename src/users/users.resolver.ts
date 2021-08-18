import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-guard';
import { UserArgs } from './dto/args/user.args';
import { RegisterInput } from './dto/inputs/register.input';
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
  async user(@Args() userArgs: UserArgs): Promise<User> {
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
