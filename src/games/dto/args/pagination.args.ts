import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@ArgsType()
export class GamesPaginationArgs {
  @Field(() => Int)
  @IsNumber()
  limit: number;
  @Field(() => Int)
  @IsNumber()
  page: number;
  @Field(() => [String], { nullable: true })
  filterBy: string[];
  @Field(() => [String], { nullable: true })
  filter: string[];
  @Field(() => String, { nullable: true })
  sortBy: string;
  @Field(() => String, { nullable: true })
  order: 'ASC' | 'DESC';
}
