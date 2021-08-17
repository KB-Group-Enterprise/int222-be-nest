import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { Role } from './entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
