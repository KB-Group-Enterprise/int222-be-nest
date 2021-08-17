import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class NewGameInput {
  @Field()
  gameName: string;
  @Field(() => Float)
  basePrice: number;
  @Field()
  description: string;
}
