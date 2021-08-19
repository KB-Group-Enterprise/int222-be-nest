import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IRetailer } from '../interface/game';
import { Game } from './game.entity';

@Entity({ name: 'retailers' })
@ObjectType()
export class Retailer implements IRetailer {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  retailerId: number;

  @Column()
  @Field()
  retailerName: string;

  @ManyToMany(() => Game, (game) => game.gameId)
  games: Game[];
}
