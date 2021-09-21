import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users.entity';

@Entity({ name: 'roles' })
@ObjectType()
export class Role {
  @PrimaryGeneratedColumn('increment', { name: 'role_id' })
  @Field((type) => Int)
  roleId: number;
  @Column({ name: 'role_name' })
  @Field()
  roleName: string;
}
