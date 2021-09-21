import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadService } from 'src/upload/upload.service';
import { AttributeResolver } from './attributes.resolver';
import { AttributeService } from './attributes.service';
import { Category } from './entities/category.entity';
import { Game } from './entities/game.entity';
import { GameImage } from './entities/gameImage.entity';
import { Publisher } from './entities/publisher.entity';
import { Retailer } from './entities/retailer.entity';
import { GamesResolver } from './games.resolver';
import { GamesService } from './games.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game, GameImage, Retailer, Publisher, Category]),
    UploadService,
  ],
  providers: [
    GamesService,
    GamesResolver,
    UploadService,
    AttributeService,
    AttributeResolver,
  ],
  exports: [GamesService, AttributeService],
})
export class GamesModule {}
