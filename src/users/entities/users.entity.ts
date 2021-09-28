import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RestoreQuestion } from './restore-question.entity';
import { Role } from './role.entity';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  @Field((type) => String)
  userId: string;

  @Column({ unique: true })
  @Field((type) => String)
  username: string;

  @Column({ nullable: false })
  password: string;

  @ManyToOne((type) => Role)
  @JoinColumn({ name: 'role_id' })
  @Field((type) => Role)
  role: Role;

  @ManyToOne((type) => RestoreQuestion)
  @JoinColumn({ name: 'question_id' })
  @Field((type) => RestoreQuestion, { nullable: false })
  question: RestoreQuestion;

  @Column({ name: 'restore_answer', nullable: false })
  restoreAnswer: string;

  @Column({ name: 'refresh_token_count', nullable: true, default: 0 })
  refreshTokenCount?: number;

  @Column({ name: 'profile_image_name', nullable: true })
  @Field((type) => String, { nullable: true })
  profileImageName?: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
