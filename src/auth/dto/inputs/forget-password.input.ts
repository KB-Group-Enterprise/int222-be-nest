import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';

@InputType()
export class ForgotPasswordInput {
  @Field((type) => String)
  @IsNotEmpty()
  username: string;

  @Field((type) => String)
  @IsNotEmpty()
  userId: string;

  @Field((type) => String)
  @IsNotEmpty()
  restoreAnswer: string;

  @Field((type) => String)
  @Length(8, 20)
  newPassword: string;
}
