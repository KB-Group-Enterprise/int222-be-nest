import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field((type) => String)
  @IsNotEmpty()
  username: string;

  @Field((type) => String)
  @IsNotEmpty()
  password: string;

  @Field((type) => String)
  @IsNotEmpty()
  confirmPassword: string;
}
