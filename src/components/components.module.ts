import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { GamesModule } from './games/games.module';
@Module({
  imports: [CarsModule, GamesModule],
})
export class ComponentsModule {}
