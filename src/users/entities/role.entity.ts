import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users.entity';

@Entity({ name: 'role' })
@ObjectType()
export class Role {
  @PrimaryGeneratedColumn('increment')
  @Field((type) => Int)
  roleId: number;
  @Column()
  @Field()
  roleName: string;
}
