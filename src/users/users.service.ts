import { BadRequestException } from '@nestjs/common';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterInput } from '../auth/dto/inputs/register.input';
import { Role } from './entities/role.entity';
import { User } from './entities/users.entity';
import * as bcrypt from 'bcrypt';
import { RestoreQuestion } from './entities/restore-question.entity';
import { ForgotPasswordInput } from 'src/auth/dto/inputs/forget-password.input';
import { UploadService } from 'src/upload/upload.service';
import { Upload } from 'src/upload/interfaces/upload.interface';
import { SUBFOLDER } from 'src/upload/enum/SUBFOLDER';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(RestoreQuestion)
    private questionRepository: Repository<RestoreQuestion>,
    private uploadService: UploadService,
  ) {}

  async getAllUser() {
    return await this.userRepository
      .find({ relations: ['role', 'question'] })
      .catch((err) => {
        throw new NotFoundException();
      });
  }

  async createUser(newUserData: RegisterInput): Promise<User> {
    const usernameRegex = /^[a-zA-Z]+\d*\w*/;
    if (!usernameRegex.test(newUserData.username))
      throw new BadRequestException(
        'Your username must only contain character or number',
      );
    const existUser = await this.userRepository.findOne({
      username: newUserData.username,
    });
    if (existUser) throw new ConflictException();
    if (newUserData.password !== newUserData.confirmPassword)
      throw new BadRequestException("Your Password doesn't match");

    newUserData.password = await this.generateHashPassword(
      newUserData.password,
    );
    const newUser = this.userRepository.create(newUserData);
    const question = await this.questionRepository.findOne({
      questionId: newUserData.questionId,
    });
    const reviewerRole = await this.roleRepository.findOne({
      roleName: 'reviewer',
    });
    newUser.role = reviewerRole;
    newUser.question = question;
    await this.userRepository.save(newUser).catch((err) => {
      throw new InternalServerErrorException(err);
    });
    return newUser;
  }
  async generateHashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  async verifyPassword(password: string, user: User): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }
  async findUserByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne(
      { username: username },
      { relations: ['role', 'question'] },
    );
  }
  async findUserByIdAndUpdate(
    userId: string,
    updateData: any,
  ): Promise<boolean> {
    await this.userRepository.update(userId, updateData).catch((err) => {
      return false;
    });
    return true;
  }
  async findUserByUserId(userId: string): Promise<User> {
    return await this.userRepository.findOne({ userId });
  }

  async getAllQuestion(): Promise<RestoreQuestion[]> {
    return await this.questionRepository.find();
  }

  async forgotPassword(newData: ForgotPasswordInput) {
    const user = await this.userRepository.findOne({
      userId: newData.userId,
    });
    if (!user) throw new NotFoundException();
    if (user.restoreAnswer !== newData.restoreAnswer)
      throw new BadRequestException("Your answer doesn't match");
    const hashNewPassword = await this.generateHashPassword(
      newData.newPassword,
    );
    await this.findUserByIdAndUpdate(user.userId, {
      password: hashNewPassword,
    });
  }

  async deleteUserByUserId(userId: string) {
    await this.userRepository.delete(userId);
  }
  async uploadProfileImage(image: Upload, { userId }: User): Promise<string> {
    const fileName = await this.uploadService.singleUpload(
      image,
      SUBFOLDER.USERS,
    );
    const user = await this.userRepository.findOne(userId);
    if (user.profileImageName) {
      await this.uploadService.deleteFiles(
        [user.profileImageName],
        SUBFOLDER.USERS,
      );
    }
    await this.findUserByIdAndUpdate(userId, { profileImageName: fileName });
    return fileName;
  }

  // example for test only
  async uploadMultipleFile(images: Upload[]): Promise<string[]> {
    const filesName = await this.uploadService.multipleUpload(
      images,
      SUBFOLDER.USERS,
    );
    return filesName;
  }
  async test() {
    this.uploadService.deleteFiles(
      ['H7vWDsvlfV.png', 'RzCMNaj1bv.png', 'VWdH6t7AUN.png'],
      SUBFOLDER.USERS,
    );
  }
}
