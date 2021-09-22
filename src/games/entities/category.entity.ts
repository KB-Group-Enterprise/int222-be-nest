import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ICategory } from '../interface/game';
import { Game } from './game.entity';

@Entity({ name: 'categories' })
@ObjectType()
export class Category implements ICategory {
  @PrimaryGeneratedColumn({ name: 'category_id' })
  @Field(() => Int)
  categoryId: number;

  @Column({ name: 'category_name' })
  @Field()
  categoryName: string;

  @ManyToMany(() => Game, (game) => game.categories)
  games: Game[];
}
