import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResponseStatus {
  @Field(() => Int)
  status: number;
  @Field()
  message: string;
}
