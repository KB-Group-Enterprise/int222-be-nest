import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from './game.entity';

@Entity({ name: 'categories' })
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  categoryId: number;

  @Column()
  @Field()
  categoryName: string;

  @ManyToMany(() => Game, (game) => game.gameId)
  games: Game[];
}
