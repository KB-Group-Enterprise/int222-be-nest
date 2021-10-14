import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
@InputType()
export class CategoryInput {
  @Field(() => Int)
  @IsNumber()
  categoryId: number;

  @Field()
  @IsString()
  categoryName: string;
}
