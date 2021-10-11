import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@ArgsType()
export class GetPublisherArgs {
  @Field(() => Int)
  @IsNumber()
  publisherId: number;
}
