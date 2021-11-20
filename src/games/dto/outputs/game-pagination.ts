import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Game } from 'src/games/entities/game.entity';
@ObjectType()
export class GamePaginationOutput extends Pagination<Game> {
  @Field((type) => [Game])
  items: Game[];
}
