import { Field, InputType, Int } from '@nestjs/graphql';
import { IRetailer } from 'src/games/interface/game';
@InputType()
export class RetailerInput implements IRetailer {
  @Field((type) => Int)
  retailerId: number;

  @Field()
  retailerName: string;
}
