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
  @PrimaryGeneratedColumn({ name: 'vote_id' })
  @Field(() => Int)
  voteId: number;

  @Column({ name: 'is_upvote' })
  @Field(() => Int)
  isUpvote: number;

  @ManyToOne((type) => Review)
  @JoinColumn({ name: 'review_id' })
  @Field(() => Review)
  review: Review;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'user_id' })
  @Field((type) => User)
  user: User;
}
