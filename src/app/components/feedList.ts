import { Component, CORE_DIRECTIVES } from 'angular2/angular2';
import { Router } from 'angular2/router';

import { Routes } from '../route.config';
import { FeedTypeIconClassPipe } from '../pipes/feedTypeIconClass';

import { Feed } from '../entities/feed';
import { FeedService } from '../services/feedService';

// import { AddListComponent } from './addList';
import { FeedSummaryComponent } from './feedSummary';


@Component({
  selector: 'feed-list',
  directives: [CORE_DIRECTIVES, /*AddListComponent,*/ FeedSummaryComponent],
  pipes: [FeedTypeIconClassPipe],
  styles: [`
    .feed-list-bottom {
      padding-top: 10px;
      border-top: 1px solid #eee;
      width: 100%;
      float: left;
      text-align: center;
    }
    .feed-item {
      float: left;
      padding-top: 0.5em;
      padding-bottom: 0.5em;
      width: 100%;
    }
  `],
  template: `
  <ul class="pure-menu-list">
    <li feed-summary [feed]="feed"
      class="feed-item pure-menu-item"
      *ng-for="#feed of feeds; var $index = index;"
      (click)="gotoFeedDetail(feed)">
    </li>
  </ul>
  `
})
export class FeedListComponent {
  public routes = Routes;
	public feeds: Feed[];
  public bNewListFormVisible: boolean = false;

  constructor(private _feedService: FeedService,
              private _router: Router) { }

	onInit() {
    if (!this.feeds) {
      this._feedService.getFeeds().then((feeds: Feed[]) => {
        this.feeds = feeds;
      });
    }
  }
  
  gotoFeedDetail(feed: Feed) {
    this._router.navigate([Routes.feeddetail.as, { id: feed.id }]);
  }
  
  toggleNewListForm() {
    this.bNewListFormVisible = !this.bNewListFormVisible;
  }
}
