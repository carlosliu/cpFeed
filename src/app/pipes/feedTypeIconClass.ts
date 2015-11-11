import { Pipe } from 'angular2/angular2';

import { FeedSourceType } from '../entities/common';

@Pipe({ name: 'feedTypeIconClass' })
export class FeedTypeIconClassPipe {
  transform(value: FeedSourceType, args: any[]) {
    var partialClassName = '';
    
    switch (value) {
      case FeedSourceType.Personal:
        partialClassName = 'user';
        break;
      case FeedSourceType.Youtube:
        partialClassName = 'youtube';
        break;
      case FeedSourceType.Vimeo:
        partialClassName = 'vimeo';
        break;
      default:
        partialClassName = 'question';
        break;
    }
    
    return 'fa fa-' + partialClassName;
    
  }
}