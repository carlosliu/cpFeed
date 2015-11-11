/// <reference path="../../typings/_custom.d.ts" />

import { provide, Injectable } from 'angular2/angular2';
import { Http, Headers } from 'angular2/http';
import * as Rx from '@reactivex/rxjs';
declare var zone: Zone;

import { getListIdFromURL } from '../utils';


@Injectable()
export class YoutubeService {
  
  yahooQueryUrl: string
    = 'https://query.yahooapis.com/v1/public/yql?q=';
  youtubePlaylistFeedTemplate: string
    = 'https://www.youtube.com/feeds/videos.xml?playlist_id=REPLACEWITHID';
  youtubeChannelFeedTemplate: string
    = 'https://www.youtube.com/feeds/videos.xml?channel_id=REPLACEWITHID';
  youtubeUserFeedTemplate: string
    = 'https://www.youtube.com/feeds/videos.xml?user=REPLACEWITHID';
  
  // youtubeListFeedUrl: string = 'http://www.youtube.com/feeds/videos.xml?playlist_id=';
  // youtubeListInfoUrl: string = 'http://www.youtube.com/oembed?url=https://www.youtube.com/playlist?list=';
  // youtubeOembedUrl: string = 'http://www.youtube.com/oembed?url=';
  
  constructor(public http: Http) { }
    
  private canonicalLink(query: string): Rx.Observable<any[]> {
    return this.http.get(this.yahooQueryUrl
        + encodeURIComponent('select * from html where url="' + query + '" and xpath=\'//link[@rel="canonical"]/@href\'')
        + '&format=json')
      .map(res => res.json())
      .map(res => {
        return res.query.results
            && res.query.results.link
            && res.query.results.link.href
      });
  }
  
  private processUrlDirty(url: string): string {
    // only applied on canonical ink
    var parser = document.createElement('a');
    parser.href = url;
    // playlist
    if (parser.pathname === '/watch' || parser.pathname === '/playlist') {
      let code = parser.search.match(/[\?&]list=([^&#]{5,})/);
      // console.log(code);
      if (code && typeof code[1] == 'string') {
        var playlist_id = code[1];
        return this.youtubePlaylistFeedTemplate.replace('REPLACEWITHID', playlist_id);
      }
    }
    else {
      let code = parser.pathname.split('/');
      // console.log(code);
      // user
      if (code && code[1] == 'user') {
        var user_id = code[2];
        return this.youtubeUserFeedTemplate.replace('REPLACEWITHID', user_id);
      }
      // channel
      else if (code && code[1] == 'channel') {
        var channel_id = code[2];
        return this.youtubeChannelFeedTemplate.replace('REPLACEWITHID', channel_id);
      }
    }
    
    return '';
  }
  
  getThumbnail(url: string): string {
    //select * from html where url="https://www.youtube.com/channel/UCw95T_TgbGHhTml4xZ9yIqg" and xpath='//img[@class="channel-header-profile-image"]'
    return this.http.get(this.yahooQueryUrl
        + encodeURIComponent('select * from html where url="' + url + '" and xpath=\'//img[@class="channel-header-profile-image"]\'')
        + '&format=json')
      .map(res => res.json())
      .map(res => {
        return res.query.results
            && res.query.results.img
            && res.query.results.img.src
      })
      .first();
  }

  /**
   * @returns an Observable of playlist info
   */
  getList(query: string): Rx.Observable<any[]> {
    return this.canonicalLink(query)
      .map(res => this.processUrlDirty(<string>res))
      .filter(res => !!res)
      .flatMap(url => {
        return this.http.get(this.yahooQueryUrl
            + encodeURIComponent('select * from xml where url="' + url + '"')
            + '&format=json')
          .map(res => res.json())  // make json
          .map(res => {
            return res.query.results && res.query.results.feed
          })   // extract info only
          .filter(feed => feed) // only if there are results
          .first();
      });
  }
}

export var YOUTUBE_PROVIDERS: Array<any> = [
  provide(YoutubeService, {useClass: YoutubeService})
];
