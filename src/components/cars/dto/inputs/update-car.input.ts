import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCarInput {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field()
  price: number;
  @Field()
  gas: string;
}
