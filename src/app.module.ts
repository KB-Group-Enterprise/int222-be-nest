import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
<<<<<<< HEAD
=======
import { GamesModule } from './games/games.module';
>>>>>>> 79eb7c3 ([Moved] all module from component to src)
import { CarsModule } from './cars/cars.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    CarsModule,
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      playground: true,
      debug: true,
      autoSchemaFile: true,
    }),
<<<<<<< HEAD
<<<<<<< HEAD
=======
    GamesModule,
    CarsModule,
>>>>>>> 79eb7c3 ([Moved] all module from component to src)
=======
    AuthModule,
    UsersModule,
>>>>>>> 1ad6296 ([Add] User, Role, RestoreQuestion  Entities)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
