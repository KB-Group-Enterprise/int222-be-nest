import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindReviewByUserArgs {
  @Field((type) => String)
  userId: string;
}
