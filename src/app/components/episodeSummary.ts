import { Component, CORE_DIRECTIVES } from 'angular2/angular2';

import { EpisodeSourceType, FeedSourceType } from '../entities/common';
import { Episode } from '../entities/episode';

import { EmbedVideoPlayerComponent } from './embedVideoPlayer';

import { EpisodeTypeIconClassPipe } from '../pipes/episodeTypeIconClass';

@Component({
  selector: '[episode-summary]',
  directives: [CORE_DIRECTIVES, EmbedVideoPlayerComponent],
  inputs: [ 'feedType', 'episode', 'selectedEpisodeId' ],
  pipes: [EpisodeTypeIconClassPipe],
  styles: [`
  .hidden {
    visibility: hidden;
  }
  `],
  template: `
	<div [ng-class]="{hidden: isTypeIconHidden()}" 
    class="episode-type-icon {{ episode.source_type | episodeTypeIconClass }}">
  </div>
	<div class="text_ellipsis pure-menu-link">
		<a href="{{ episode.source_url }}">{{ episode.title }}</a>
		<br />
		<small>{{ episode.created_at | date:'yMMMMd' }}</small>
		<br />
		<small>{{ episode.description }}</small>
    <div embed-video-player
      [videourl]="episode.source_url"
      [videotype]="episode.source_type"
      *ng-if="isVideoVisible(episode)">
    </div>
	</div>
  `
})
export class EpisodeSummaryComponent {
  public episode: Episode;
  public selectedEpisodeId: string;
  public feedType: FeedSourceType;
  
  constructor() { }
  
  isTypeIconHidden(): boolean {
    return this.feedType !== FeedSourceType.Personal;
  }
  
  isVideoVisible(episode: Episode): boolean {
    // console.log("test");
    if (episode.source_url) {
      switch (episode.source_type) {
        case EpisodeSourceType.Youtube:
        case EpisodeSourceType.Vimeo:
          return episode.id ? episode.id === this.selectedEpisodeId : false;
        default:
          break;
      }
    }
  }
}