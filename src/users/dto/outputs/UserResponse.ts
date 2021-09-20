import { RestoreQuestion } from 'src/users/entities/restore-question.entity';
import { Role } from 'src/users/entities/role.entity';
import { User } from 'src/users/entities/users.entity';

export class UserResponse {
  private userId: string;
  private username: string;
  private role: Role;
  private question: RestoreQuestion;
  constructor(user: User) {
    this.userId = user.userId;
    this.username = user.username;
    this.role = user.role;
    this.question = user.question;
  }
}
