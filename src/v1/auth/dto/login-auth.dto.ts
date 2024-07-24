import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginAuthDtoV1 {
  @IsEmail()
  userEmail: string;

  @IsString()
  @IsNotEmpty()
  userPassword: string;
}
