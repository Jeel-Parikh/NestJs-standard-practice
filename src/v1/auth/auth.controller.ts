import { Controller, Post, Body } from '@nestjs/common';

import { Serializer } from './../../common/interceptors';
import { genResponse } from './../../helpers';
import { AuthServiceV1 } from './auth.service';
import { LoginAuthDtoV1 } from './dto/login-auth.dto';
import { ResLoginDtoV1 } from './dto/res-login.dto';

@Serializer(ResLoginDtoV1)
@Controller({ path: 'auth', version: '1' })
export class AuthControllerV1 {
  constructor(private readonly authService: AuthServiceV1) {}

  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDtoV1) {
    const loginData = await this.authService.login(loginAuthDto);
    return genResponse(loginData, 'Login successfully');
  }
}
