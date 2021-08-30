import { Field, ObjectType } from '@nestjs/graphql';
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

  @Column({ nullable: false })
  password: string;

  @ManyToOne((type) => Role)
  @JoinColumn({ name: 'roleId' })
  @Field((type) => Role)
  role: Role;

  @ManyToOne((type) => RestoreQuestion)
  @JoinColumn({ name: 'questionId' })
  @Field((type) => RestoreQuestion, { nullable: false })
  question: RestoreQuestion;

  @Column({ name: 'restoreanswer', nullable: false })
  restoreAnswer: string;

  @Column({ name: 'refreshtoken_count', nullable: true, default: 0 })
  refreshTokenCount?: number;

  @Column({ name: 'profile_image_name', nullable: true })
  @Field((type) => String, { nullable: true })
  profileImageName?: string;
}
