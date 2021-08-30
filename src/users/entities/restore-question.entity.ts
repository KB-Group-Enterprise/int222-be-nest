import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users.entity';

@Entity({ name: 'restore_question' })
@ObjectType()
export class RestoreQuestion {
  @PrimaryGeneratedColumn('increment')
  @Field()
  questionId: number;

  @Column()
  @Field((type) => String)
  question: string;
}
