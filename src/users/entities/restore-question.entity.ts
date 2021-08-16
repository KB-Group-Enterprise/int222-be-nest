import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users.entity';

@Entity({ name: 'restore_question' })
export class RestoreQuestion {
  @PrimaryGeneratedColumn('increment')
  questionId: number;

  @Column()
  question: string;

  @OneToMany((type) => User, (user) => user.question)
  users: User[];
}
