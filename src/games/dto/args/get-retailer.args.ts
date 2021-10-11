import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@ArgsType()
export class GetRetailerArgs {
  @Field(() => Int)
  @IsNumber()
  retailerId: number;
}
