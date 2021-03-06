import { BadRequestException, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-guard';
import { UserArgs } from './dto/args/user.args';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
import { RestoreQuestion } from './entities/restore-question.entity';
import { DeleteUserInput } from './dto/inputs/delete-user.input';
import { Upload } from 'src/upload/interfaces/upload.interface';
import { GraphQLUpload } from 'graphql-upload';
import { ConfigService } from '@nestjs/config';
import { ImageOutPut } from './dto/outputs/image.output';
import { CurrentUserGql } from 'src/auth/current-user-gql';
import { RolesGuard } from 'src/authorization/roles.guard';
import { ROLES } from 'src/authorization/ROLES';
import { Roles } from 'src/authorization/roles.decorator';
import { RestoreQuestionOutput } from './dto/outputs/restore_question';
import { UpdateRoleInput } from './dto/inputs/update-role.input';
@Resolver()
export class UsersResolver {
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
  ) {}

  @Query((returns) => User)
  async user(@Args() userArgs: UserArgs): Promise<User> {
    return await this.userService.findUserByUsername(userArgs.username);
  }
  @Query((returns) => [RestoreQuestion])
  async questions(): Promise<RestoreQuestion[]> {
    const question = await this.userService.getAllQuestion();
    return question;
  }
  @Mutation((returns) => Boolean)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  async deleteUser(@Args('deleteData') deleteData: DeleteUserInput) {
    await this.userService.deleteUserByUserId(deleteData.userId);
    return true;
  }
  // Need to Authenticate, Authorize before getting resources
  @Query((returns) => [User])
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  async users(): Promise<User[]> {
    return await this.userService.getAllUser();
  }

  @Mutation((returns) => ImageOutPut)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('roles', ROLES.REVIEWER)
  async uploadProfileImage(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: Upload,
    @CurrentUserGql() currentUser: User,
  ): Promise<ImageOutPut> {
    const fileName = await this.userService.uploadProfileImage(
      file,
      currentUser,
    );
    return {
      imageName: `${fileName}`,
    };
  }
  @Mutation((returns) => Boolean)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles('roles', ROLES.ADMIN)
  async updateRole(
    @Args('updateRoleData') updateRoleData: UpdateRoleInput,
    @CurrentUserGql() user: User,
  ) {
    if (user.userId === updateRoleData.userId)
      throw new BadRequestException("You can't update your role");
    const result = await this.userService.updateRole(updateRoleData);
    return result;
  }
  @Mutation((returns) => RestoreQuestionOutput)
  async getRestoreQuestion(
    @Args('username') targetUsername: string,
  ): Promise<RestoreQuestionOutput> {
    const questionAndUsername = await this.userService.getQuestionByUsername(
      targetUsername,
    );
    return questionAndUsername;
  }

  // Examples multiple files
  // @Mutation((returns) => [String])
  // async uploadMultiple(
  //   @Args({ name: 'files', type: () => [GraphQLUpload] })
  //   files: Upload[],
  // ): Promise<string[]> {
  //   const filesName = await this.userService.uploadMultipleFile(files);
  //   return filesName;
  // }

  // @Mutation((returns) => String)
  // async test() {
  //   this.userService.test();
  //   return 'foo';
  // }
}
