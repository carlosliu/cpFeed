import { Component, CORE_DIRECTIVES } from 'angular2/angular2';

import { FeedTypeIconClassPipe } from '../pipes/feedTypeIconClass';

import { EpisodeSourceType, FeedSourceType } from '../entities/common';
import { Feed } from '../entities/feed';


@Component({
  selector: '[feed-summary]',
  directives: [CORE_DIRECTIVES],
  inputs: [ 'feed', 'isHeader' ],
  pipes: [FeedTypeIconClassPipe],
  // styles: [`.active {}`],
  template: `
    <div *ng-if="feed" class="clearfix" [ng-class]="{'pure-menu-link': !isHeader}">
      <div class="feed-thumbnail"><img src="{{ feed.thumbnail }}"></div>
      <div class="feed-type-icon {{ feed.source_type | feedTypeIconClass }}"></div>
      <div class="text_ellipsis">
        {{ feed.title }}
        <br />
        <small>{{ feed.created_at | date:'yMMMMd' }}</small>
        <br />
        <small>{{ feed.description }}</small>
      </div>
    </div>
  `
})
export class FeedSummaryComponent {
  public feed: Feed;
  
  constructor() {
  }
  
  // onInit() {
  //   if (!this.feed) {
  //     let id = this._routeParams.get('id');
  //     // console.log('feedId = ' + id);
  //     this._feedService.getFeed(id).then((feed: Feed) => {
  //       this.feed = feed;
  //       this.episodes = feed.episodes;
  //     });
  //   }
  //   // this.episodes = this.getEpisodes();
  //   // debugger;
  // }
}