/// <reference path="../../typings/_custom.d.ts" />

// Angular 2
import { Directive, View, EventEmitter, ElementRef } from 'angular2/angular2';
// RxJs
import * as Rx from '@reactivex/rxjs';
declare var zone: Zone;

import { YoutubeService } from '../services/youtubeService';
import { getListIdFromURL } from '../utils';

import { FeedSourceType, EpisodeSourceType } from '../entities/common';
import { Feed } from '../entities/feed';
import { Episode } from '../entities/episode';


@Directive({
  selector: 'input[type=url][get-youtube-list]',
  outputs: [ 'results', 'loading' ],
  providers: [ YoutubeService ],
})
export class GetYoutubeList {
  results: EventEmitter = new EventEmitter();
  loading: EventEmitter = new EventEmitter();

  constructor(private el: ElementRef,
              public youtube: YoutubeService) { }

  // Lifecycle hook
  onInit() {

    (<any>Rx).Observable.fromEvent(this.el.nativeElement, 'keyup')
      .filter(e => e.keyCode == 13)
      .map(e => e.target.value)                  // Project the text from the input
      .filter(text => text.length > 2)           // Only if the text is longer than 2 characters
      .debounceTime(250)                         // Pause for 250ms
      .distinctUntilChanged()                    // Only if the value has changed
      .do(zone.bind(() => this.loading.next(true)))
      .flatMap(query => this.youtube.getList(query)) // send query to search service
      .do(zone.bind(() => this.loading.next(false)))
      // here is the real action
      .subscribe(
        // onNext
        zone.bind(res => {
          let feed: Feed = { 
            id: res.id,
            source_type: FeedSourceType.Youtube,
            source_list_url: res.link.href,
            auto_update: true,
            created_at: new Date(res.published), 
            title: res.title,
            description: '', 
            thumbnail: '', 
            episodes: []
          }
          if (res.entry && res.entry.length > 0) {
            feed.episodes = res.entry.map(entry => {
              let episode: Episode = {
                id: entry.id,
                created_at: new Date(entry.published),
                title: entry.title,
                description: entry.group.description,
                audio_url: '',
                audio_ready: false,
                source_type: EpisodeSourceType.Youtube,
                source_url: entry.link.href
              };
              return episode;
            })
          }
          // fire "results" event
          // the Search component is the listener
          this.results.next([feed]);
        }),
        // onError
        zone.bind(err => {
          console.log(err);
          this.results.next(['ERROR, see console']);
        }),
        // onComplete
        () => {
          console.log('complete');
        }
      )//subscribe
  }

}
