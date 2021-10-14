import { Field, InputType, Int } from '@nestjs/graphql';
import { IPublisher } from 'src/games/interface/game';
@InputType()
export class NewPublisherInput {
  @Field()
  publisherName: string;
}
