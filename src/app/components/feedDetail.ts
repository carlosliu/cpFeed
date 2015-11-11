import { Component, CORE_DIRECTIVES } from 'angular2/angular2';
import { RouteParams, Router } from 'angular2/router';

import { Routes } from '../route.config';

import { FeedService } from '../services/feedService';

import { FeedSummaryComponent } from './feedSummary';
import { EpisodeSummaryComponent } from './episodeSummary';
import { AddEpisodeComponent } from './addEpisode';

import { EpisodeSourceType, FeedSourceType } from '../entities/common';
import { Feed } from '../entities/feed';
import { Episode } from '../entities/episode';


@Component({
  selector: 'feed-detail',
  directives: [
    CORE_DIRECTIVES,
    AddEpisodeComponent,
    FeedSummaryComponent,
    EpisodeSummaryComponent
  ],
  inputs: ['feed'],
  styles: [`
    .episode-item {
      float: left;
      padding-top: 10px;
      padding-bottom: 10px;
      width: 100%;
    }
    .feed-header-top {
      padding-top: 1em;
      padding-bottom: 1em;
      border-bottom: 1px solid #eee;
    }
  `],
  template: `
  <div feed-summary [feed]="feed" [is-header]="true" class="clearfix feed-header-top pure-menu-heading"></div>
  <ul class="pure-menu-list">
    <li episode-summary
      [feed-type]="feed.source_type"
      [episode]="episode"
      [selected-episode-id]="selectedEpisodeId"
      class="episode-item pure-menu-item"
      *ng-for="#episode of episodes;"
      (click)="selectEpisode(episode)">
    </li>
  </ul>
  `
})
export class FeedDetailComponent {
  public feed: Feed;
  public episodes: Episode[];
  public selectedEpisodeId: string = '';
  
  constructor(private _feedService: FeedService,
              private _routeParams: RouteParams) { }
  
  onInit() {
    if (!this.feed) {
      let id = this._routeParams.get('id');
      // console.log('feedId = ' + id);
      this._feedService.getFeed(id).then((feed: Feed) => {
        this.feed = feed;
        this.episodes = feed.episodes;
      });
    }
    else if (this.feed.episodes) {
      this.episodes = this.feed.episodes;
    }
    // debugger;
  }
  
  selectEpisode(episode: Episode) {
    if (episode.source_url) {
      switch (episode.source_type) {
        case EpisodeSourceType.Youtube:
        case EpisodeSourceType.Vimeo:
          if (episode.id) {
            this.selectedEpisodeId = this.selectedEpisodeId === episode.id ? '' : episode.id;
          }
          break;
        default:
          break;
      }
    }
  }
  
}
