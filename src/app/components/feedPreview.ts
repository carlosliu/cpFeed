import { Component, CORE_DIRECTIVES } from 'angular2/angular2';
import { RouteParams, Router } from 'angular2/router';

import { Routes } from '../route.config';

import { FeedService } from '../services/feedService';

import { FeedSummaryComponent } from './feedSummary';
import { EpisodeSummaryComponent } from './episodeSummary';

import { getVideoIdFromURL } from '../utils';

import { EpisodeSourceType, FeedSourceType } from '../entities/common';
import { Feed } from '../entities/feed';
import { Episode } from '../entities/episode';


@Component({
  selector: 'feed-preview',
  directives: [CORE_DIRECTIVES, FeedSummaryComponent, EpisodeSummaryComponent],
  styles: [`
    .episode-item {
      float: left;
      padding-top: 10px;
      padding-bottom: 10px;
      width: 100%;
    }
    .feed-description-top {
      padding-top: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
    }
  `],
  template: `
  <main class="clearfix fixedToRight--2col">
    <div feed-summary [feed]="feed" class="clearfix feed-description-top"></div>
    
    <div class="episode-item" *ng-for="#episode of episodes" (click)="toggleYoutubeVideo(episode)">
      <div *ng-if="feed.source_type==0" class="episode-type-icon {{ episode.source_type | episodeTypeIconClass }}"></div>
      <div class="text_ellipsis">
        <a href="{{ episode.source_url }}">{{ episode.title }}</a>
        <br />
        <small>{{ episode.created_at | date:'yMMMMd' }}</small>
        <br />
        <small>{{ episode.description }}</small>
      </div>
      <div class="responsive-video" *ng-if="isVideoVisible(episode)">
        <iframe src="{{ episode.source_url | youtubeUrl:'embed' }}" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
  </main>
  `
})
export class FeedPreviewComponent {
  public feed: Feed;
  public episodes: Episode[];
  public currentVideo: string = '';
  
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
    // this.episodes = this.getEpisodes();
    // debugger;
  }
  
  isVideoVisible(episode: Episode): boolean {
    if (episode.source_url) {
      var videoId;
      
      switch (episode.source_type) {
        case EpisodeSourceType.Youtube:
          videoId = getVideoIdFromURL(episode.source_url);
          if (videoId) {
            return this.currentVideo === videoId;
          }
          
          break;
        default:
          break;
      }
    }
  }
  
  toggleYoutubeVideo(episode: Episode) {
    if (episode.source_url) {
      var videoId;
      
      switch (episode.source_type) {
        case EpisodeSourceType.Youtube:
          videoId = getVideoIdFromURL(episode.source_url);
          if (videoId) {
            this.currentVideo = this.currentVideo === videoId ? '' : videoId;
          }
          
          break;
        default:
          break;
      }
    }
  }
  
  getYoutubeEmbedLink(episode: Episode) {
    if (episode.source_url) {
      var videoId;
      
      switch (episode.source_type) {
        case EpisodeSourceType.Youtube:
          videoId = getVideoIdFromURL(episode.source_url);
          if (videoId) {
            return "https://www.youtube.com/embed/" + videoId;
          }
          
          break;
        default:
          break;
      }
    }  
  }
  
}