import { EpisodeSourceType } from './common';

export class Episode {
  id: string;
  created_at: Date;
  title: string;
  description: string;
  audio_url: string;
  audio_ready: boolean = false;
  source_type: EpisodeSourceType;
  source_url: string;
}