import { EpisodeSourceType, FeedSourceType } from '../entities/common';
import { Feed } from '../entities/feed';

export var _feeds: Feed[] = [
	{
    id: 'my_feed',
    source_type: FeedSourceType.Personal,
    source_list_url: '',
    auto_update: false,
    created_at: new Date(),
    title: '[Mock] personal feed title',
    description: 'personal feed description',
    thumbnail: 'images/moon.jpg',
    episodes: [
      { id: 'my_episode_1',
        created_at: new Date(),
        title: "[Mock] ep1 title",
        description: 'episode 1 in my personal feed', 
        audio_url: '', 
        audio_ready: false,
        source_type: EpisodeSourceType.Audio,
        source_url: ''
      },
      { id: 'my_episode_2',
        created_at: new Date(),
        title: "[Mock] ep2 title",
        description: 'episode 2 in my personal feed', 
        audio_url: '', 
        audio_ready: false,
        source_type: EpisodeSourceType.Vimeo,
        source_url: 'https://vimeo.com/8578344'
      },
      { id: 'my_episode_3',
        created_at: new Date(),
        title: "[Mock] ep3 title",
        description: 'episode 3 in my personal feed', 
        audio_url: '', 
        audio_ready: false,
        source_type: EpisodeSourceType.Youtube,
        source_url: 'https://www.youtube.com/watch?v=e-ORhEE9VVg'
      }
    ]
  },
  {
    id: 'my_yt_feed_1',
    source_type: FeedSourceType.Youtube,
    source_list_url: 'https://www.youtube.com/playlist?list=PLW_lsVObsdmCxnUcA-FyTaK8NohNNHNXa',
    auto_update: true,
    created_at: new Date(),
    title: '[Mock] youtube feed one title',
    description: 'youtube feed one description',
    thumbnail: 'http://lorempixel.com/200/200/technics/1',
    episodes: [
      { id: 'my_episode_2',
        created_at: new Date(),
        title: "[Mock] ep2 title",
        description: 'episode 2 in my personal feed', 
        audio_url: '', 
        audio_ready: false,
        source_type: EpisodeSourceType.Youtube,
        source_url: 'https://www.youtube.com/watch?v=KaOC9danxNo'
      }
    ]
  },
  { 
    id: 'my_yt_feed_2',
    source_type: FeedSourceType.Youtube,
    source_list_url: 'https://www.youtube.com/playlist?list=PL06CFA0286FF91575',
    auto_update: true,
    created_at: new Date(), 
    title: '[Mock] youtube feed two title', 
    description: 'youtube feed two description', 
    thumbnail: 'http://lorempixel.com/200/200/technics/2', 
    episodes: [
      { id: 'yt_episode_1',
        created_at: new Date(),
        title: "[Mock] yt_ep1 title",
        description: 'episode 1 in my youtube feed one', 
        audio_url: '', 
        audio_ready: false,
        source_type: EpisodeSourceType.Youtube,
        source_url: 'https://www.youtube.com/watch?v=ej3ioOneTy8'
      },
      { id: 'yt_episode_1a',
        created_at: new Date(),
        title: "[Mock] yt_ep1a title",
        description: 'episode 1a in my youtube feed two', 
        audio_url: '', 
        audio_ready: false,
        source_type: EpisodeSourceType.Youtube,
        source_url: 'https://www.youtube.com/watch?v=sGbxmsDFVnE'
      }
    ]
  }
];
