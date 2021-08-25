import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { Role } from './entities/role.entity';
import { RestoreQuestion } from './entities/restore-question.entity';
import { UploadModule } from 'src/upload/upload.module';
import { UploadService } from 'src/upload/upload.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, RestoreQuestion]),
    UploadModule,
  ],
  providers: [UsersService, UsersResolver, UploadService],
  exports: [UsersService],
})
export class UsersModule {}
