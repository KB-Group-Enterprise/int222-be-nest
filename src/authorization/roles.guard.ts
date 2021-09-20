import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { User } from '../users/entities/users.entity';
import { ROLES } from './ROLES';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user = gqlContext.req.user as User;
    if (!roles) return true;
    if (!user) return false;
    const userRole = user.role.roleName;
    if (userRole === ROLES.ADMIN) return true;
    const hasRole = () => roles.includes(userRole);
    return user && userRole && hasRole();
  }
}
