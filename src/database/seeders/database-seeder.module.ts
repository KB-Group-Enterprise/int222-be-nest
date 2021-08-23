import { Module } from '@nestjs/common';
import { Connection, getConnectionOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/games/entities/game.entity';
import { Retailer } from 'src/games/entities/retailer.entity';
import { Publisher } from 'src/games/entities/publisher.entity';
import { Category } from 'src/games/entities/category.entity';
import { User } from 'src/users/entities/users.entity';
import { RestoreQuestion } from 'src/users/entities/restore-question.entity';
import { Role } from 'src/users/entities/role.entity';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          entities: [
            Game,
            Retailer,
            Publisher,
            Category,
            User,
            Role,
            RestoreQuestion,
          ],
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
