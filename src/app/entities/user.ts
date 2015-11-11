import { Feed } from './feed';

export class User {
  id: string;
  created_at: Date;
  description: string;
  thumbnail: string;
  feeds_id: Array<string>;
}