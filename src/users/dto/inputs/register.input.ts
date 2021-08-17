import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Max, Min } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field((type) => String)
  @IsNotEmpty()
  @Min(4)
  @Max(16)
  username: string;

  @Field((type) => String)
  @IsNotEmpty()
  @Min(8)
  @Max(20)
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
