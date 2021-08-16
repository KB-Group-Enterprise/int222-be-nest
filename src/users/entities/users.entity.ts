import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RestoreQuestion } from './restore-question.entity';
import { Role } from './role.entity';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => String)
  userId: string;

  @Column({ unique: true })
  @Field((type) => String)
  username: string;

  @Column()
  @Field((type) => String)
  password: string;

  @ManyToOne((type) => Role, (role) => role.users)
  @Field((type) => Int)
  role: number;

  @ManyToOne(
    (type) => RestoreQuestion,
    (restoreQuestion) => restoreQuestion.users,
  )
  @Field((type) => String)
  question: string;

  @Field((type) => String)
  restore_answer: string;

  @Field((type) => String)
  refresh_token: string;
}
