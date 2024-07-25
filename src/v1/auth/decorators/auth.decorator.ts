import { UseGuards } from '@nestjs/common';

import { AuthGuardV1 } from '../guards';

export function AuthenticationV1() {
  return UseGuards(AuthGuardV1);
}
