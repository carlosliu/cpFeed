import { Pipe } from 'angular2/angular2';

import { EpisodeSourceType } from '../entities/common';
import { getVideoIdFromURL } from '../utils';

@Pipe({ name: 'videoUrl' })
export class VideoUrlPipe {
  transform(value: string, args: any[]) {
    
    // console.log(args[0]);
    
    let videoId = getVideoIdFromURL(value);
    
    if (videoId) {
      switch (args[0]) {
        case 'embed':
          if (args[1] === EpisodeSourceType.Youtube )
            return "https://www.youtube.com/embed/" + videoId;
          else if (args[1] === EpisodeSourceType.Vimeo)
            return "https://player.vimeo.com/video/" + videoId;
          break;
        default:
          break;
      }
    }
    
  }
}