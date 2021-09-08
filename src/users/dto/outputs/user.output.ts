import { RestoreQuestion } from 'src/users/entities/restore-question.entity';
import { Role } from 'src/users/entities/role.entity';

export class IUser {
  userId: string;
  username: string;
  role: Role;
  question: RestoreQuestion;
}
