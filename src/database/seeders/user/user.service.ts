import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestoreQuestion } from 'src/users/entities/restore-question.entity';
import { Role } from 'src/users/entities/role.entity';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { restoreQuestionSeeds, roleSeeds, userSeeds } from './data';

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(RestoreQuestion)
    private readonly questionRepository: Repository<RestoreQuestion>,
  ) {}

  createRole(): Array<Promise<Role>> {
    return roleSeeds.map(async (role: Role) => {
      return await this.roleRepository
        .findOne(role.roleId)
        .then(async (dbRow) => {
          if (dbRow) {
            return Promise.resolve(null);
          }
          return Promise.resolve(this.roleRepository.save(role));
        })
        .catch((error) => Promise.reject(error));
    });
  }
  createQuestion(): Array<Promise<RestoreQuestion>> {
    return restoreQuestionSeeds.map(async (question: RestoreQuestion) => {
      return await this.questionRepository
        .findOne(question.questionId)
        .then(async (dbRow) => {
          if (dbRow) {
            return Promise.resolve(null);
          }
          return Promise.resolve(this.questionRepository.save(question));
        })
        .catch((error) => Promise.reject(error));
    });
  }

  createUser(): Array<Promise<User>> {
    return userSeeds.map(async (user: any) => {
      console.log(user);
      return await this.userRepository
        .findOne(user.userId)
        .then(async (dbRow) => {
          if (dbRow) {
            return Promise.resolve(null);
          }
          return Promise.resolve(this.userRepository.save(user));
        })
        .catch((error) => Promise.reject(error));
    });
  }
}
