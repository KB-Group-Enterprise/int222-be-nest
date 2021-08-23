import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestoreQuestion } from 'src/users/entities/restore-question.entity';
import { Role } from 'src/users/entities/role.entity';
import { User } from 'src/users/entities/users.entity';
import { UserSeederService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, RestoreQuestion, User])],
  providers: [UserSeederService],
  exports: [UserSeederService],
})
export class UserSeederModule {}
