import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@ArgsType()
export class GetCategoryArgs {
  @Field(() => Int)
  @IsNumber()
  categoryId: number;
}
