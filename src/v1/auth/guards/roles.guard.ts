import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { EUsersRole } from '../../users/types/user.type';

// export const ROLES_KEY = 'roles';
// // Decorator
// export const Roles = (...roles: EUsersRole[]) => SetMetadata(ROLES_KEY, roles);

// Guard
@Injectable()
export class RolesGuardV1 implements CanActivate {
  constructor(
    // private reflector: Reflector,
    private requiredRoles: EUsersRole[],
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // const requiredRoles = this.reflector.getAllAndOverride<EUsersRole[]>(
    //   ROLES_KEY,
    //   [context.getHandler(), context.getClass()],
    // );
    if (!this.requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return this.requiredRoles.some((role) => user.userRole === role);
  }
}
