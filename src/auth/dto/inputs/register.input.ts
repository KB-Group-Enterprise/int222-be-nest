import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Length, Max, Min } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field((type) => String)
  @IsNotEmpty()
  @Length(4, 20)
  username: string;

  @Field((type) => String)
  @IsNotEmpty()
  @Length(8, 20)
  password: string;

  @Field((type) => String)
  @IsNotEmpty()
  confirmPassword: string;

  @Field((type) => Number)
  @IsNotEmpty()
  questionId: number;

  @Field((type) => String)
  @IsNotEmpty()
  restoreAnswer: string;
}
