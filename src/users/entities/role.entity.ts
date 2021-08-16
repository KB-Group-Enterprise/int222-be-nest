import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users.entity';

@Entity({ name: 'role' })
export class Role {
  @PrimaryGeneratedColumn('increment')
  roleId: number;
  @Column()
  roleName: string;
  @OneToMany((type) => User, (user) => user.userId)
  users: User[];
}
