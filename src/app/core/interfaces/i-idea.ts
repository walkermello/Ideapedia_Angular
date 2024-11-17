import { IUser } from './i-user';

export interface IIdea {
  id: number;
  judul: string;
  deskripsi: string;
  fileName: string;
  filePath: string;
  fileImage: string;
  createdAt: string; // Bisa menggunakan string atau Date sesuai format API
  user: IUser;
}
