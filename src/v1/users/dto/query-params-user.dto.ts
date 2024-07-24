import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { IPaginationParams } from './../../../common/interfaces';
import { ConditionUserDtoV1 } from './condition-user.dto';
export class QueryParamsUserDtoV1
  extends ConditionUserDtoV1
  implements IPaginationParams
{
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  offset?: number;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  limit?: number;
}
