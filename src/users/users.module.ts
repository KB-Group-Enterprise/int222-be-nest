import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { Role } from './entities/role.entity';
import { RestoreQuestion } from './entities/restore-question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, RestoreQuestion])],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
