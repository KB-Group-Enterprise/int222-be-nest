import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Pagination, IPaginationMeta } from 'nestjs-typeorm-paginate';
import { Game } from 'src/games/entities/game.entity';
@ObjectType()
export class GamePaginationOutput extends Pagination<Game> {
  @Field((type) => [Game])
  items: Game[];
  @Field((type) => GamePaginaionMeta)
  meta;
}
@ObjectType()
export class GamePaginaionMeta implements IPaginationMeta {
  [s: string]: any;
  @Field((type) => Int)
  itemCount: number;
  @Field((type) => Int, { nullable: true })
  totalItems?: number;
  @Field((type) => Int)
  itemsPerPage: number;
  @Field((type) => Int, { nullable: true })
  totalPages?: number;
  @Field((type) => Int)
  currentPage: number;
}
