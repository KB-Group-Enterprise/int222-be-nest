import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-guard';
import { UserArgs } from './dto/args/user.args';
import { RegisterInput } from '../auth/dto/inputs/register.input';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
import { UserOutput } from './dto/outputs/user.output';
import { RestoreQuestion } from './entities/restore-question.entity';
import { DeleteUserInput } from './dto/inputs/delete-user.input';
import { Upload } from 'src/upload/interfaces/upload.interface';
import { GraphQLUpload } from 'graphql-upload';
import { ConfigService } from '@nestjs/config';
import { ImageOutPut } from './dto/outputs/image.output';
import { CurrentUser } from 'src/auth/current-user';
@Resolver()
export class UsersResolver {
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
  ) {}

  @Query((returns) => [User])
  @UseGuards(GqlAuthGuard)
  async users(): Promise<User[]> {
    return await this.userService.getAllUser();
  }
  @Query((returns) => User)
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
  @Mutation((returns) => Boolean)
  async deleteUser(@Args('deleteData') deleteData: DeleteUserInput) {
    await this.userService.deleteUserByUserId(deleteData.userId);
    return true;
  }

  @Mutation((returns) => ImageOutPut)
  @UseGuards(GqlAuthGuard)
  async uploadProfileImage(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: Upload,
    @CurrentUser() currentUser: User,
  ) {
    const fileName = await this.userService.uploadProfileImage(
      file,
      currentUser,
    );
    const PORT = this.configService.get('PORT');
    return {
      url: `http://localhost:${PORT}/users/${fileName}`,
    };
  }

  // Examples multiple files
  @Mutation((returns) => [String])
  async uploadMultiple(
    @Args({ name: 'files', type: () => [GraphQLUpload] })
    files: Upload[],
  ): Promise<string[]> {
    const filesName = await this.userService.uploadMultipleFile(files);
    return filesName;
  }

  @Mutation((returns) => String)
  async test() {
    this.userService.test();
    return 'foo';
  }
}
