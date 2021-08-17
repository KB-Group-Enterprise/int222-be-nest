import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetGameArgs {
  @Field(() => String)
  @IsNotEmpty()
  id: string;
}
