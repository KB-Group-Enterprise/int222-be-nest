import { Logger, Module } from '@nestjs/common';
import { GameSeederModule } from './game/game.module';
import { Seeder } from './seeder';
import { DatabaseSeederModule } from './database-seeder.module';
@Module({
  imports: [DatabaseSeederModule, GameSeederModule],
  providers: [GameSeederModule, Seeder, Logger],
})
export class SeederModule {}
