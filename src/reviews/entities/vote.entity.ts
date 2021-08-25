import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Game } from 'src/games/entities/game.entity';
import { IGame } from 'src/games/interface/game';
import { User } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IVote } from '../interface/review';
import { Review } from './review.entity';

@Entity({ name: 'votes' })
@ObjectType()
export class Vote implements IVote {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  voteId: number;

  @Column()
  @Field(() => Int)
  vote: number;

  @ManyToOne((type) => Review)
  @JoinColumn({ name: 'reviewId' })
  review: Review;

  @ManyToOne((type) => Game)
  @JoinColumn({ name: 'gameId' })
  @Field((type) => Game)
  game: Game;
}
