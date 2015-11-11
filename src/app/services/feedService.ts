/// <reference path="../../typings/_custom.d.ts" />

// Angular2
import { Injectable } from 'angular2/angular2';

// Entities
import { FeedSourceType, EpisodeSourceType } from '../entities/common';
import { Feed } from '../entities/feed';
import { Episode } from '../entities/episode';

// Mock up data
import { _feeds } from '../mock/mock-feeds';
// import { _episodes } from '../entities/mock-episodes';


// Feed Service
@Injectable()
export class FeedService {
  // we shouldn't access ._state outside of the class
  // our initial state defined above
  private _feeds: Feed[] = _feeds;
  
  // private _episodes: Episode[] = _episodes;
  
  // private _todos = [
  //   { value: 'finish example', created_at: new Date() },
  //   { value: 'add tests',      created_at: new Date() },
  //   { value: 'include development environment', created_at: new Date() },
  //   { value: 'include production environment',  created_at: new Date() }
  // ];
  
  constructor() {

  }

  cloneFeeds() {
    return this._feeds.slice();
  }
  
  getFeeds() {
    return Promise.resolve(this._feeds);
  }
  
  getFeed(id: string) {
    return Promise.resolve(this._feeds)
      .then((feeds: Feed[]) => {
        return feeds.filter((h) => {
          return h.id === id;
        })[0];
      });
    // var feeds = this._feeds.filter(feed => {
    //   return feed.id === id;
    // });
    
    // if (feeds.length === 1)
    //   return feeds[0];
    
  }
  
  addFeed(feed: Feed) {
    
    var feeds = this.cloneFeeds();
    
    feeds.push(feed);
    
    this._feeds = feeds;
  }
  
  removeFeed(id: string): Feed {

    var feeds = this.cloneFeeds();
    
    var index = feeds.findIndex((feed) => {
      return feed.id === id;
    });
    
    var removedFeeds = feeds.splice(index, 1);
    
    if (removedFeeds.length === 1) {
      this._feeds = feeds;
      return removedFeeds[0];
    }
    
  }
  
  addEpisode(episode: Episode, feedId: string) {
    
    var feeds = this.cloneFeeds();
    var feed = this.getFeed(feedId)
      .then((feed: Feed) => {
        feed.episodes.push(episode);
      });
    
    // if (feed)
    //     feed.episodes.push(episode);
    
  }
  
  removeEpisode(episodeId: string, feedId: string) {

    var feeds = this.cloneFeeds();
    var feed = this.getFeed(feedId)
      .then((feed: Feed) => {
        if (feed && feed.source_type === FeedSourceType.Youtube) {
          
          var index = feed.episodes.findIndex((episode) => {
            return episode.id === episodeId;
          });
          
          var episode = feed.episodes.splice(index, 1); 
        
          if (feeds.length === 1) {
            this._feeds = feeds;      
            return feeds[0];
          }
        // var episodes = this.cloneEpisodes();
        }
      });
    
  }
  
/*  
  add = (value) => {
    // Async call to server then save state
    var todo = {
      value: value,
      created_at: new Date()
    };

    var todos = this.cloneTodos();
    todos.push(todo);

    // You can use .set to replace state
    this._todos = todos;
  }

  remove(index) {
    // Async call to server then save state

    var todos = this.cloneTodos();
    todos.splice(index, 1);

    // Always Replace state
    this._todos = todos;

  }
*/

}//FeedService

// export injectables for this module
export var FEED_SERVICE: Array<any> = [
  FeedService
];
