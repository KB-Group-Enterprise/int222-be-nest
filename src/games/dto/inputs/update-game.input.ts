import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsAlphanumeric } from 'class-validator';
import { IGame } from 'src/games/interface/game';
import { CategoryInput } from './category.input';
import { PublisherInput } from './publisher.input';
import { RetailerInput } from './retailer.input';
@InputType()
export class UpdateGameInput implements IGame {
  @Field((type) => Int)
  gameId: number;

  @Field()
  @IsAlphanumeric()
  gameName: string;

  @Field((type) => Float)
  basePrice: number;

  @Field()
  description: string;

  @Field((type) => PublisherInput)
  publisher: PublisherInput;

  @Field((type) => [CategoryInput])
  categories: CategoryInput[];

  @Field((type) => [RetailerInput])
  retailers: RetailerInput[];
}
