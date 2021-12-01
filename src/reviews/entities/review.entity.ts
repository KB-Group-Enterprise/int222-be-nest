import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Game } from 'src/games/entities/game.entity';
import { User } from 'src/users/entities/users.entity';
import { Vote } from 'src/votes/entities/vote.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @ManyToOne((type) => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'reviewer_id' })
  @Field((type) => User)
  reviewer: User;

  @ManyToOne((type) => Game, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'game_id' })
  @Field((type) => Game)
  game: Game;

  @OneToMany((type) => Vote, (vote) => vote.review, { eager: true })
  @Field((type) => [Vote])
  votes: Vote[];

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
