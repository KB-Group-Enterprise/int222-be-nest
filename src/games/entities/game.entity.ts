import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { type } from 'os';
import { Publisher } from 'src/games/entities/publisher.entity';
import { Review } from 'src/reviews/entities/review.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IGame } from '../interface/game';
import { Category } from './category.entity';
import { GameImage } from './gameImage.entity';
import { Retailer } from './retailer.entity';

@Entity({ name: 'games' })
@ObjectType()
export class Game implements IGame {
  @PrimaryGeneratedColumn({ name: 'game_id' })
  @Field(() => Int)
  gameId: number;

  @Column({ name: 'game_name' })
  @Field()
  gameName: string;

  @Column('decimal', {
    name: 'base_price',
    precision: 15,
    scale: 2,
    default: () => "'0.00'",
  })
  @Field(() => Float)
  basePrice: number;

  @Column({ name: 'description' })
  @Field()
  description: string;

  @ManyToOne((type) => Publisher, {
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinColumn({ name: 'publisher_id' })
  @Field((type) => Publisher)
  publisher: Publisher;

  @ManyToMany(() => Category, (category) => category.games, {
    eager: true,
  })
  @JoinTable({
    name: 'games_categories',
    joinColumn: { name: 'games_game_id', referencedColumnName: 'gameId' },
    inverseJoinColumn: {
      name: 'categories_category_id',
      referencedColumnName: 'categoryId',
    },
  })
  @Field((type) => [Category])
  categories: Category[];

  @ManyToMany(() => Retailer, (retailer) => retailer.games, {
    eager: true,
  })
  @JoinTable({
    name: 'games_retailers',
    joinColumn: { name: 'games_game_id', referencedColumnName: 'gameId' },
    inverseJoinColumn: {
      name: 'retailers_retailer_id',
      referencedColumnName: 'retailerId',
    },
  })
  @Field((type) => [Retailer])
  retailers: Retailer[];

  @OneToMany(() => GameImage, (gameImage) => gameImage.game)
  @Field((type) => [GameImage])
  images: GameImage[];

  @Column('int', { name: 'rating', nullable: true })
  @Field((type) => Int, { nullable: true })
  rating: number;

  @OneToMany(() => Review, (review) => review.game)
  @Field((type) => [Review])
  reviews: Review[];

  @Column('date', { name: 'release_date' })
  @Field()
  releaseDate: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: Date;
}
