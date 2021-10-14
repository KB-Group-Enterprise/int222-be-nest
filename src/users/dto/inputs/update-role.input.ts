import { Field, InputType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { ROLES } from 'src/authorization/ROLES';

@InputType()
export class UpdateRoleInput {
  @Field()
  userId: string;
  @Field()
  @IsEnum(ROLES)
  role: ROLES;
}
