import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Game } from 'src/games/entities/game.entity';
import { User } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IReview } from '../interface/review';

@Entity({ name: 'reviews' })
@ObjectType()
export class Review implements IReview {
  @PrimaryGeneratedColumn({ name: 'review_id' })
  @Field((type) => Int)
  reviewId: number;

  @Column({ type: 'float', name: 'rating' })
  @Field((type) => Float)
  rating: number;

  @Column({ name: 'comment' })
  @Field()
  comment: string;

  @ManyToOne((type) => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'reviewer_id' })
  @Field((type) => User)
  reviewer: User;

  @ManyToOne((type) => Game, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'game_id' })
  @Field((type) => Game)
  game: Game;
}
