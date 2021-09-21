import { Logger, Module } from '@nestjs/common';
import { GameSeederModule } from './game/game.module';
import { Seeder } from './seeder';
import { UserSeederModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/games/entities/game.entity';
import { Retailer } from 'src/games/entities/retailer.entity';
import { Publisher } from 'src/games/entities/publisher.entity';
import { Category } from 'src/games/entities/category.entity';
import { User } from 'src/users/entities/users.entity';
import { RestoreQuestion } from 'src/users/entities/restore-question.entity';
import { Role } from 'src/users/entities/role.entity';
import { GameImage } from 'src/games/entities/gameImage.entity';
import * as dotenv from 'dotenv';
dotenv.config({
  path: `.env`,
});
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Game,
        Retailer,
        Publisher,
        Category,
        User,
        Role,
        RestoreQuestion,
        GameImage,
      ],
      synchronize: false,
      dropSchema: false,
    }),
    GameSeederModule,
    UserSeederModule,
  ],
  providers: [GameSeederModule, Seeder, Logger, UserSeederModule],
})
export class SeederModule {}
