import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateVoteInput {
  @Field(() => Int)
  reviewId: number;
  @Field()
  userId: string;
  @Field(() => Int)
  isUpvote: number;
}
