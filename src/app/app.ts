/// <reference path="../typings/_custom.d.ts" />

import {Component} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {Routes, APP_ROUTES} from './route.config';
import { InfoBarComponent } from './components/infoBar';

/*
 * App Component
 */
@Component({
  selector: 'app',
  directives: [ROUTER_DIRECTIVES, InfoBarComponent],
  /*styles: [`
    .router-link {padding: 5px;text-decoration: none;}
    .router-link:visited, .router-link:link {color: #444;}
    .router-link:hover {color: white; background-color: #1171a3; text-decoration: none;}
    .router-link.router-link-active {color: white; background-color: #52b9e9; text-decoration: none;}
  `],*/  
  styles: [`
    header.banner {
      color: #eee;
      background: #58b2dc;
      text-align: center;
    }
  `],
  template: `
    <header class="banner clearfix fixedToTopLeft--2col">
      <info-bar></info-bar>
    </header>
    <main class="clearfix fixedToRight--2col">
      <router-outlet></router-outlet>
    </main>
    <bottom role="contentinfo" class="fixedToBottom fixedToBottomLeft--2col">
      <p>© 2015 <a href="/">{{ title }} by {{ author }}</a></p>
    </bottom>
  `
})
@RouteConfig(APP_ROUTES)
export class App {
  public title: string = 'cpFeed';
  public author: string = 'Carlos Liu';
  public routes = Routes;
  
  constructor() {

  }

}
