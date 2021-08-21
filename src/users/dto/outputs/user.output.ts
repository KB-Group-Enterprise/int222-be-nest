import { Field, ObjectType } from '@nestjs/graphql';
import { RestoreQuestion } from 'src/users/entities/restore-question.entity';
import { Role } from 'src/users/entities/role.entity';

@ObjectType()
export class UserOutput {
  @Field((type) => String)
  userId: string;

  @Field((type) => String)
  username: string;

  @Field((type) => Role)
  role: Role;

  @Field((type) => RestoreQuestion)
  question: RestoreQuestion;
}
