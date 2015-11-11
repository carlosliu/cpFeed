import { Pipe } from 'angular2/angular2';

import { EpisodeSourceType } from '../entities/common';

@Pipe({ name: 'episodeTypeIconClass' })
export class EpisodeTypeIconClassPipe {
  transform(value: EpisodeSourceType, args: any[]) {
		var partialClassName = '';
		
		switch (value) {
			case EpisodeSourceType.Audio:
				partialClassName = 'music';
				break;
			case EpisodeSourceType.Video:
				partialClassName = 'video-camera';
				break;
			case EpisodeSourceType.Youtube:
				partialClassName = 'youtube';
				break;
			case EpisodeSourceType.Vimeo:
				partialClassName = 'vimeo';
				break;
			default:
				partialClassName = 'question';
				break;
		}
		
		return 'fa fa-' + partialClassName;
    
  }
}