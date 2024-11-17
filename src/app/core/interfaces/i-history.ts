import { IUser } from './i-user';

export interface IHistory {
  id: number;
  action: string;
  timestamp: string;
  user: IUser;
}
