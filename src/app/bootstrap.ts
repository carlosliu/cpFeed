/// <reference path="../typings/_custom.d.ts" />

// Angular 2
import { bootstrap, provide } from 'angular2/angular2';

import { FORM_PROVIDERS, ELEMENT_PROBE_PROVIDERS } from 'angular2/angular2'
import { ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';

/*
 * App
 */
import { App } from './app';

/*
 * Services
 */
import { FEED_SERVICE } from './services/feedService';
// import {TODO_SERVICE} from './services/TodoService';


const APP_PROVIDERS = [
  // These are dependencies of our App
  FORM_PROVIDERS,
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  ELEMENT_PROBE_PROVIDERS,
  // Services
  // TODO_SERVICE,
  FEED_SERVICE,
  // https://github.com/johnpapa/angular2-tour-of-heroes/pull/27
  provide(LocationStrategy, { useClass: HashLocationStrategy })
];
/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Universal/Platform services/bindings into Angular's dependency injection
 */
bootstrap(
  // Top Level Component
  App,
  // AppBindings
  APP_PROVIDERS
);
