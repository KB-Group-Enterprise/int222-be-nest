import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ImageOutPut {
  @Field()
  url: string;
}
