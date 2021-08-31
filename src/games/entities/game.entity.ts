import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Publisher } from 'src/games/entities/publisher.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IGame } from '../interface/game';
import { Category } from './category.entity';
import { GameImage } from './gameImage.entity';
import { Retailer } from './retailer.entity';

@Entity({ name: 'games' })
@ObjectType()
export class Game implements IGame {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  gameId: number;

  @Column()
  @Field()
  gameName: string;

  @Column()
  @Field(() => Float)
  basePrice: number;

  @Column()
  @Field()
  description: string;

  @ManyToOne((type) => Publisher, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'publisherId' })
  @Field((type) => Publisher)
  publisher: Publisher;

  @ManyToMany(() => Category, (category) => category.categoryId)
  @JoinTable({ name: 'games_categories' })
  @Field((type) => [Category])
  categories: Category[];

  @ManyToMany(() => Retailer, (retailer) => retailer.retailerId)
  @JoinTable({ name: 'games_retailers' })
  @Field((type) => [Retailer])
  retailers: Retailer[];

  @OneToMany(() => GameImage, (gameImage) => gameImage.game)
  @Field((type) => [GameImage])
  images: GameImage[];
}
