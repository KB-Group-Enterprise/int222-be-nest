import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cars' })
@ObjectType()
export class Car {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;
  @Column()
  @Field()
  name: string;
  @Column()
  @Field()
  price: number;
  @Column()
  @Field()
  gas: string;
}
