import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ObjectType()
export class DeleteGameOutput {
  @Field(() => Int)
  gameId: number;
  @Field(() => String)
  status: string;
}
