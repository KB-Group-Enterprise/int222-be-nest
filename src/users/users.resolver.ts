import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
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

  @Mutation((returns) => User)
  async createUser(
    @Args('createUserData') createUserData: RegisterInput,
  ): Promise<User> {
    const newUser = await this.userService.createUser(createUserData);
    return newUser;
  }
}
