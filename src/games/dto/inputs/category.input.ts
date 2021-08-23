import { Field, InputType, Int } from '@nestjs/graphql';
@InputType()
export class CategoryInput {
  @Field(() => Int)
  categoryId: number;

  @Field()
  categoryName: string;
}
