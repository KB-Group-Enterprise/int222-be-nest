import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { GamesModule } from './games/games.module';
import { CarsModule } from './cars/cars.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { VotesModule } from './votes/votes.module';
import { UploadModule } from './upload/upload.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CarsModule,
    DatabaseModule,
    GraphQLModule.forRoot({
      context: ({ req, res }) => ({ req, res }),
      playground: true,
      debug: true,
      autoSchemaFile: true,
      uploads: false,
    }),
    GamesModule,
    CarsModule,
    AuthModule,
    UsersModule,
    ReviewsModule,
    VotesModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
