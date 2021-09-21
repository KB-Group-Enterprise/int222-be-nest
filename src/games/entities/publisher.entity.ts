import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Game } from 'src/games/entities/game.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IPublisher } from '../interface/game';

@Entity({ name: 'publishers' })
@ObjectType()
export class Publisher implements IPublisher {
  @PrimaryGeneratedColumn({ name: 'publisher_id' })
  @Field(() => Int)
  publisherId: number;

  @Column({ name: 'publisher_name' })
  @Field()
  publisherName: string;
}
