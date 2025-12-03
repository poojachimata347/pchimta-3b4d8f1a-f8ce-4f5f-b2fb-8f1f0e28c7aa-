import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@taskmgr/auth';
import { Role } from '../entities/user.entity';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (!user) throw new ForbiddenException();

    const roleOrder = [Role.VIEWER, Role.ADMIN, Role.OWNER];
    const userIndex = roleOrder.indexOf(user.role);
    const allowed = requiredRoles.some((r) => userIndex >= roleOrder.indexOf(r));

    if (!allowed) throw new ForbiddenException();
    return true;
  }
}
