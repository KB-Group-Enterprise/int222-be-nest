import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterInput } from './dto/inputs/register.input';
import { Role } from './entities/role.entity';
import { User } from './entities/users.entity';
import * as bcrypt from 'bcrypt';
import { RestoreQuestion } from './entities/restore-question.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(RestoreQuestion)
    private questionRepository: Repository<RestoreQuestion>,
  ) {}

  async getAllUser() {
    return await this.userRepository
      .find({ relations: ['role', 'question'] })
      .catch((err) => {
        throw new NotFoundException();
      });
  }

  async createUser(newUserData: RegisterInput): Promise<User> {
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
    return await this.userRepository.findOne({ username: username });
  }
}
