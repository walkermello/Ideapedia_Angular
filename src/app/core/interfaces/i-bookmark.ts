import { IIdea } from './i-idea';
import { IUser } from './i-user';

export interface IBookmark {
  id: number;
  user: IUser;
  idea: IIdea;
  bookmarkedAt: string;
}
