import { Module } from '@nestjs/common';
import { Connection, getConnectionOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/games/entities/game.entity';
import { Retailer } from 'src/games/entities/retailer.entity';
import { Publisher } from 'src/games/entities/publisher.entity';
import { Category } from 'src/games/entities/category.entity';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          entities: [Game, Retailer, Publisher, Category],
        }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseSeederModule {
  constructor(private connection: Connection) {
    if (connection.isConnected) console.log('DB connected successfully');
  }
}
