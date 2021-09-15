import { Field, ObjectType } from '@nestjs/graphql';
import { RestoreQuestion } from 'src/users/entities/restore-question.entity';

@ObjectType()
export class RestoreQuestionOutput {
  @Field(() => String)
  username: string;

  @Field(() => RestoreQuestion)
  question: RestoreQuestion;
}
