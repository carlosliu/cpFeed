import { FeedSourceType } from './common';
import { Episode } from './episode';

export class Feed {
  id: string;
  created_at: Date;
  source_type: FeedSourceType;
  source_list_url: string;
  auto_update: boolean;
  title: string;
  description: string;
  thumbnail: string;
  episodes: Array<Episode>;
}