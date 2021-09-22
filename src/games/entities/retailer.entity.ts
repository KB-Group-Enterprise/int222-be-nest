import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IRetailer } from '../interface/game';
import { Game } from './game.entity';

@Entity({ name: 'retailers' })
@ObjectType()
export class Retailer implements IRetailer {
  @PrimaryGeneratedColumn({ name: 'retailer_id' })
  @Field((type) => Int)
  retailerId: number;

  @Column({ name: 'retailer_name' })
  @Field()
  retailerName: string;

  @ManyToMany(() => Game, (game) => game.retailers)
  games: Game[];
}
