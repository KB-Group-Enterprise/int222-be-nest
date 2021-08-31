import { Field, Float, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsAlphanumeric } from 'class-validator';
import { IGame } from 'src/games/interface/game';
import { CategoryInput } from './category.input';
import { NewGameInput } from './new-game.input';
import { PublisherInput } from './publisher.input';
import { RetailerInput } from './retailer.input';
@InputType()
export class UpdateGameInput extends PartialType(NewGameInput) {
  @Field((type) => Int)
  gameId: number;
}
