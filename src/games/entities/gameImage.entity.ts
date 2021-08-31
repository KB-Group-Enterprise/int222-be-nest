import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Game } from './game.entity';

@Entity({ name: 'game_images' })
@ObjectType()
export class GameImage {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @Field()
  name: string;

  @ManyToOne((type) => Game, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'gameId' })
  game: Game;
}
