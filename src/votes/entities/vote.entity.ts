import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IVote } from '../interface/votes';

@Entity({ name: 'votes' })
@ObjectType()
export class Vote implements IVote {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  voteId: number;

  @Column()
  @Field(() => Int)
  isUpvote: number;

  @ManyToOne((type) => Review)
  @JoinColumn({ name: 'reviewId' })
  @Field(() => Review)
  review: Review;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'userId' })
  @Field((type) => User)
  user: User;
}
