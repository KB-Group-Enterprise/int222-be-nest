import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-auth.strategy';
import { JwtStrategy } from './strategies/jwt-auth.strategy';
import { AuthResolver } from './auth.resolver';
import { RefreshStrategy } from './strategies/refresh-auth.strategy';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({})],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AuthResolver,
    RefreshStrategy,
  ],
})
export class AuthModule {}
