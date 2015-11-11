/// <reference path="../../typings/_custom.d.ts" />

import { Component, CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/angular2';
import { Router } from 'angular2/router';

import { FeedService } from '../services/feedService';

import { Routes } from '../route.config';

import { Feed } from '../entities/feed';

import { FeedSummaryComponent } from './feedSummary';
import { FeedDetailComponent } from './feedDetail';

import { GetYoutubeList } from '../directives/getYoutubeList';


@Component({
  selector: 'add-list',
  directives: [
    CORE_DIRECTIVES,
    FORM_DIRECTIVES,
    GetYoutubeList,
    FeedSummaryComponent,
    FeedDetailComponent
  ],
  host: {
    '(mouseover)': 'show()',
    '(click)': 'showclick()'
  },
  styles: [`
  .loader {
    margin-top: 20px;
  }
  .add_list_form {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    padding: 20px 0;
    text-align: center;
  }
  @media screen and (min-width: 720px) {
    .add_list_form {
      width: 350px;
    }
  }
  `],
  template: `
  <div class="add_list_form pure-form">
    <input
      get-youtube-list
      (results)="lists = $event"
      (loading)="loading = $event"
      type="url"
      class="pure-input-1"
      placeholder="YouTube playlist URL"
      autofocus>
    <div class="loader" [hidden]="!loading"></div>
  </div>

  <div *ng-for="#list of lists" class="clearfix" [hidden]="loading">
    <feed-detail [feed]="list"></feed-detail>
  </div>
  
  <div class="add_list_form pure-form" [hidden]="loading">
    <button [hidden]="lists.length==0"
      class="pure-button pure-button-primary pure-input-1"
      (click)="subscribeFeed()">Subscribe</button>
  </div>
  `
})
export class AddListComponent {
  lists: Array<any> = [];
  loading: boolean = false;
  visible: boolean = false;

  constructor(private _feedService: FeedService,
              private _router: Router) { }
  
  subscribeFeed() {
    if (this.lists.length === 1) {
      this._feedService.addFeed(<Feed>this.lists[0]);
      this._router.navigate([Routes.feedlist.as]);
    }
  }
  
  show() {
    // console.log("show!!!");
  }
  
  showclick() {
    // console.log("show click!!!");
  }
}
