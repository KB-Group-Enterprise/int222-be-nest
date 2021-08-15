import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class NewCarInput {
  @Field()
  name: string;
  @Field((type) => Int)
  price: number;
  @Field({ nullable: true })
  gas: string;
}
