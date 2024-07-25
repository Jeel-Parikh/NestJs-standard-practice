import { IResponse } from './default-res.interface';

export interface IPaginationRes<T> extends IResponse<T> {
  meta: {
    count: number;
  };
}
