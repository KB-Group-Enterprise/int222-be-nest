import { Field, InputType, Int } from '@nestjs/graphql';
import { IPublisher } from 'src/games/interface/game';
@InputType()
export class PublisherInput implements IPublisher {
  @Field(() => Int)
  publisherId: number;
  @Field()
  publisherName: string;
}
