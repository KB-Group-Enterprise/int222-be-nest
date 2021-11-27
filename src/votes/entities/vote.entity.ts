import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IVote } from '../interface/votes';

@Entity({ name: 'votes' })
@ObjectType()
export class Vote implements IVote {
  @PrimaryGeneratedColumn({ name: 'vote_id' })
  @Field(() => Int)
  voteId: number;

  @Column('smallint', { name: 'is_upvote' })
  @Field(() => Int)
  isUpvote: number;

  @ManyToOne((type) => Review, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'review_id' })
  @Field(() => Review)
  private _review: Review;
  public get review(): Review {
    return this._review;
  }
  public set review(value: Review) {
    this._review = value;
  }

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'user_id' })
  @Field((type) => User)
  user: User;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
