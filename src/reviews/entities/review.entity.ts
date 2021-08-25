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
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  reviewId: number;

  @Column({ type: 'float' })
  @Field((type) => Float)
  rating: number;

  @Column()
  @Field()
  comment: string;

  @ManyToOne((type) => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'reviewerId' })
  @Field((type) => User)
  reviewer: User;

  @ManyToOne((type) => Game, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'gameId' })
  @Field((type) => Game)
  game: Game;
}
