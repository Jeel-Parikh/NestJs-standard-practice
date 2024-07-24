import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export const encryptPassword = async (password: string) => {
  const encPassword = await bcrypt.hash(password, 12);
  return encPassword;
};

export const comparePassword = async (
  password: string,
  userPassword: string,
) => {
  try {
    return await bcrypt.compare(password, userPassword);
  } catch (err) {
    throw new BadRequestException('Invalid data');
  }
};
