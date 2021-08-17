import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Game } from 'src/components/games/entities/game.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'publishers' })
@ObjectType()
export class Publisher {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  publisherId: number;

  @Column()
  @Field()
  publisherName: string;
}
