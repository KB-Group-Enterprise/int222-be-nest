import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ObjectType()
export class DeleteOutput {
  @Field(() => Int)
  id: number;
  @Field(() => String)
  status: string;
}
