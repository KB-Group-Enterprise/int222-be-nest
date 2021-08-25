import { InputType, Int, Field } from '@nestjs/graphql';
import { Game } from 'src/games/entities/game.entity';
import { User } from 'src/users/entities/users.entity';
import { IReview } from '../interface/review';

@InputType()
export class CreateReviewInput {
  @Field((type) => Int)
  rating: number;
  @Field()
  comment: string;
  @Field()
  userId: string;
  @Field()
  gameId: number;
}
