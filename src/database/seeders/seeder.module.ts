import { Logger, Module } from '@nestjs/common';
import { GameSeederModule } from './game/game.module';
import { Seeder } from './seeder';
import { DatabaseSeederModule } from './database-seeder.module';
import { UserSeederModule } from './user/user.module';
@Module({
  imports: [DatabaseSeederModule, GameSeederModule, UserSeederModule],
  providers: [GameSeederModule, Seeder, Logger, UserSeederModule],
})
export class SeederModule {}
