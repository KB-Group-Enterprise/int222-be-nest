import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, Max, Min } from 'class-validator';

@InputType()
export class NewCarInput {
  @Field()
  @IsNotEmpty()
  name: string;
  @Field((type) => Int)
  @Min(1000)
  @Max(30000)
  price: number;
  @Field({ nullable: true })
  gas: string;
}
