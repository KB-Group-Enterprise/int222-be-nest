import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/games/entities/category.entity';
import { Game } from 'src/games/entities/game.entity';
import { Publisher } from 'src/games/entities/publisher.entity';
import { Retailer } from 'src/games/entities/retailer.entity';
import { GameSeederService } from './game.service';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Retailer, Category, Publisher])],
  providers: [GameSeederService],
  exports: [GameSeederService],
})
export class GameSeederModule {}
