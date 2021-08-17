import { BadRequestException } from '@nestjs/common';
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
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async getAllUser() {
    return await this.userRepository.find().catch((err) => {
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
    const user = this.userRepository.create(newUserData);
    await this.userRepository.save(user).catch((err) => {
      throw new InternalServerErrorException();
    });
    const newUser = await this.userRepository.findOne(
      { userId: user.userId },
      {
        relations: ['role', 'question'],
      },
    );
    const reviewerRole = await this.roleRepository.findOne({
      roleName: 'reviewer',
    });
    reviewerRole.users = [newUser];
    newUser.role = reviewerRole;
    return newUser;
  }
  async generateHashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
