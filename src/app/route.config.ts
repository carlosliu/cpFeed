import { FeedListComponent } from './components/feedList';
import { FeedDetailComponent } from './components/feedDetail';
import { AddListComponent } from './components/addList';
import { Route, Router } from 'angular2/router';

export var Routes = {
	feedlist: new Route({ path: '/', as: 'FeedList', component: FeedListComponent }),
	feeddetail: new Route({ path: '/feed/:id', as: 'FeedDetail', component: FeedDetailComponent }),
	addfeed: new Route({ path: '/add', as: 'AddFeed', component: AddListComponent })
	/*heroes: {
		path: '/myfeed/:id',
		as: 'Heroes',
		component: MyFeedComponent
	},*/
};

export const APP_ROUTES = Object.keys(Routes).map(r => Routes[r]);