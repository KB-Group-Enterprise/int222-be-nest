import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
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
  @JoinColumn()
  @Field((type) => Role)
  role: Role;

  @ManyToOne(
    (type) => RestoreQuestion,
    (restoreQuestion) => restoreQuestion.users,
  )
  @Field((type) => RestoreQuestion, { nullable: false })
  question: RestoreQuestion;

  @Column({ name: 'restoreanswer', nullable: false })
  @Field((type) => String)
  restoreAnswer: string;

  @Column({ name: 'refreshtoken', nullable: true })
  @Field((type) => String, { nullable: true })
  refreshToken?: string;

  @Column({ name: 'refreshtoken_count', nullable: true, default: 0 })
  @Field((type) => Number, { nullable: true })
  refreshTokenCount?: number;
}
