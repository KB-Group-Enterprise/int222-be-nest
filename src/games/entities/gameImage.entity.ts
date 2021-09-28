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
  @PrimaryGeneratedColumn({ name: 'image_id' })
  id: number;
  @Column({ name: 'image_name' })
  @Field()
  name: string;

  @ManyToOne((type) => Game, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'game_id' })
  game: Game;
}
