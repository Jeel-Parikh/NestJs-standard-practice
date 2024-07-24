import { Exclude } from 'class-transformer';

import { LoginAuthDtoV1 } from './login-auth.dto';
export class ResLoginDtoV1 extends LoginAuthDtoV1 {
  id: string;
  userEmail: string;
  accessToken: string;

  @Exclude()
  userPassword: string;
}
