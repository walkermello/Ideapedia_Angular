import { IUser } from './i-user';

export interface IToken {
  token: string;
  user: IUser;
}
