import { Controller, Post, Body } from '@nestjs/common';

import { IResponse } from '@/src/common/interfaces';

import { Serializer } from './../../common/interceptors';
import { AuthServiceV1 } from './auth.service';
import { LoginAuthDtoV1 } from './dto/login-auth.dto';
import { ResLoginDtoV1 } from './dto/res-login.dto';

@Controller({ path: 'auth', version: '1' })
export class AuthControllerV1 {
  constructor(private readonly authService: AuthServiceV1) {}

  @Serializer(ResLoginDtoV1)
  @Post('login')
  async login(
    @Body() loginAuthDto: LoginAuthDtoV1,
  ): Promise<IResponse<ResLoginDtoV1>> {
    const loginData = await this.authService.login(loginAuthDto);
    return { data: loginData, message: 'Login successfully' };
  }
}
