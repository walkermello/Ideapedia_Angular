import { IUnitKerja } from './i-unit-kerja';

export interface IUser {
  id: number;
  username: string;
  nip: string;
  email: string;
  password: string;
  noHp: string;
  unitKerja: IUnitKerja;
}
