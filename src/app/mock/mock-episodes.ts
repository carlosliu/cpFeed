import { EpisodeSourceType } from '../entities/common';
import { Episode } from '../entities/episode';

export var _episodes: Episode[] = [
	{ id: 'my_episode_1',
		created_at: new Date(),
		title: "ep1 title",
		description: 'episode 1 in my personal feed', 
		audio_url: '', 
    audio_ready: false,
		source_type: EpisodeSourceType.Audio,
		source_url: '' },
	{ id: 'my_episode_2',
		created_at: new Date(), 
		title: "ep2 title",
		description: 'episode 2 in my personal feed', 
		audio_url: '', 
    audio_ready: false,
		source_type: EpisodeSourceType.Youtube,
		source_url: 'https://www.youtube.com/watch?v=KaOC9danxNo' },
	{ id: 'yt_episode_1',
	  created_at: new Date(), 
		title: "yt_ep1 title",
		description: 'episode 1 in my youtube feed one', 
		audio_url: '', 
    audio_ready: false,
		source_type: EpisodeSourceType.Youtube,
		source_url: 'https://www.youtube.com/watch?v=ej3ioOneTy8' },
	{ id: 'yt_episode_1a',
		created_at: new Date(),
		title: "yt_ep1a title",
		description: 'episode 1a in my youtube feed two', 
		audio_url: '', 
    audio_ready: false,
		source_type: EpisodeSourceType.Youtube,
		source_url: 'https://www.youtube.com/watch?v=sGbxmsDFVnE' }
];