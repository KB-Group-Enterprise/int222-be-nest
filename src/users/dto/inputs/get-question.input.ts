import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetQuestionInput {
  @Field()
  username: string;
}
