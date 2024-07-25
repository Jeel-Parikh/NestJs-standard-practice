import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { EUsersRole } from '@/src/v1/users/types/user.type';

@Injectable()
export class RolesGuardV1 implements CanActivate {
  constructor(
    // private reflector: Reflector,
    private requiredRoles: EUsersRole[],
  ) {}

  canActivate(context: ExecutionContext): boolean {
    if (!this.requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return this.requiredRoles.some((role) => user.userRole === role);
  }
}
