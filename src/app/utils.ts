import { EpisodeSourceType } from './entities/common';

export function getVideoIdFromURL(url: string): string | boolean {
	// TODO: support more video sites and different style of url
	
	var parser = document.createElement('a');
	parser.href = url;
	var code: any;
	
	if (parser.hostname.includes('youtube.com')) {
		code = parser.search.match(/v=([^&#]{5,})/);
		// console.log(code);
	}
	else if (parser.hostname.includes('vimeo.com')) {
		code = parser.pathname.match(/([0-9]{5,})/);
	}
	return (code && typeof code[1] == 'string') ? code[1] : false;		
}


export function getListIdFromURL(url: string): string | boolean {
	// TODO: support more video sites and different style of url
	
	var parser = document.createElement('a');
	parser.href = url;
  var code = parser.search.match(/[\?&]list=([^&#]{5,})/);
	// console.log(code);
  return (code && typeof code[1] == 'string') ? code[1] : false;
}

