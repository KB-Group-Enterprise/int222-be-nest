import { Field, InputType, Int } from '@nestjs/graphql';
import { IRetailer } from 'src/games/interface/game';
@InputType()
export class NewRetailerInput {
  @Field()
  retailerName: string;
}
