import { IIdea } from './i-idea';

export interface IDetailIdea {
  idea: IIdea;
  id: number;
  comments: string[];
  status: string;
  createdAt: string;
}
