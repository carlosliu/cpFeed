import { Component, CORE_DIRECTIVES } from 'angular2/angular2';

import { VideoUrlPipe } from '../pipes/videoUrl';

@Component({
	selector: '[embed-video-player]',
	inputs: ['videourl', 'videotype'],
	directives: [CORE_DIRECTIVES],
  pipes: [VideoUrlPipe],
	template: `
		<div class="responsive-video">
			<iframe src="{{ videourl | videoUrl:'embed':videotype }}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
		</div>
	`
})
export class EmbedVideoPlayerComponent {
	constructor() { }
}
