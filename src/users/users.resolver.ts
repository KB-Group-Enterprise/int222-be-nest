import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-guard';
import { UserArgs } from './dto/args/user.args';
import { RegisterInput } from '../auth/dto/inputs/register.input';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
import { UserOutput } from './dto/outputs/user.output';
import { RestoreQuestion } from './entities/restore-question.entity';

@Resolver()
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Query((returns) => [UserOutput])
  @UseGuards(GqlAuthGuard)
  async users(): Promise<User[]> {
    return await this.userService.getAllUser();
  }
  @Query((returns) => UserOutput)
  async user(@Args() userArgs: UserArgs): Promise<User> {
    return await this.userService.findUserByUsername(userArgs.username);
  }
  @Mutation((returns) => User)
  @UseGuards(GqlAuthGuard)
  async createUser(
    @Args('createUserData') createUserData: RegisterInput,
  ): Promise<User> {
    const newUser = await this.userService.createUser(createUserData);
    return newUser;
  }
  @Query((returns) => [RestoreQuestion])
  async questions(): Promise<RestoreQuestion[]> {
    const question = await this.userService.getAllQuestion();
    return question;
  }
}
