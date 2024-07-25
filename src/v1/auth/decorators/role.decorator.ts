import { UseGuards } from '@nestjs/common';

import { EUsersRole } from '../../users/types/user.type';
import { RolesGuardV1 } from '../guards';

export function RoleV1(...roles: EUsersRole[]) {
  return UseGuards(new RolesGuardV1(roles));
}
