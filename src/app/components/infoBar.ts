import {Component, CORE_DIRECTIVES} from 'angular2/angular2';

import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Routes, APP_ROUTES} from '../route.config';

import { SocialButtonsComponent } from './socialButtons';

@Component({
  selector: 'info-bar',
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, SocialButtonsComponent],
  styles: [`
    .logo_info {
      display: table;
      width: 100%
    }
    .logo {
      border-radius: 50%;
      width: 100px;
      height: 100px;
      margin: 15px auto 15px auto;
      background: transparent;
      border: 3px solid #eee;
      text-align: center;
      vertical-align: middle;
    }
    @media screen and (max-width: 720px) {
      .logo {
        width: 80px;
        height: 80px;
        margin: 10px;
      }
    }
    .info_button_circle {
      font-size: 32px;
      display: table-cell;
      text-align: center;
      vertical-align: middle;
      width: 48px;
    }
    @media screen and (min-width: 720px) {    
      .info_button_circle {
        display: none;
      }
    }
  `],
  template: `
    <div class="logo_info clearfix">
      <div class="logo">
        <a [router-link]="[routes.feedlist.as]" class="router-link">
          <img style="max-width: 100%;" src="/images/cpfeed.png">
        </a>
      </div>
      <div class="info_button_circle fa fa-info-circle" (click)="toggleFoldableInfo()"></div>
    </div>
    <div style="padding-top: 20px;" [hidden]="bFoldableInfo && bCloseInfoSection">
      <a [router-link]="[routes.addfeed.as]" class="add_feed_button pure-button">
        Add New Feed
      </a>
      <div class="intro_text">
        <p>
          Lorem Ipsum has been the industry's standard dummy text 
          ever since the 1500s, when an unknown printer took a galley of type 
          and scrambled it to make a type specimen book.
        </p>
      </div>
      <social-buttons class="elsewhere"></social-buttons>
    </div>
  `
})
@RouteConfig(APP_ROUTES)
export class InfoBarComponent {
  public bFoldableInfo: boolean;
  public bCloseInfoSection: boolean;
  public routes = Routes;
  
  constructor(private _router: Router) { }
  
  onInit() {
    this.initFoldableInfo();
    
    window.addEventListener("resize", () => {
      var mql = window.matchMedia("screen and (max-width: 720px)");
      this.bFoldableInfo = mql && mql.matches;
    }, true);
    
    this._router.subscribe(() => {
      this.bCloseInfoSection = true;
    });
  }
  
  initFoldableInfo() {
    // console.log('match init');
    var mql = window.matchMedia("screen and (max-width: 720px)");
    this.bFoldableInfo = mql && mql.matches;
    this.bCloseInfoSection = true;
  }
  
  toggleFoldableInfo(/*event?: Event*/) {
    // console.log('match click');
    this.bCloseInfoSection = !this.bCloseInfoSection;
  }
}
