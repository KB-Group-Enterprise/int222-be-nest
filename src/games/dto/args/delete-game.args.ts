import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@ArgsType()
export class DeleteGameArgs {
  @Field(() => Int)
  @IsNumber()
  gameId: number;
}
