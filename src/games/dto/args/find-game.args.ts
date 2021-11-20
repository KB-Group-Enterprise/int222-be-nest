import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class FindGameArgs {
  @Field()
  gameName: string;
}
