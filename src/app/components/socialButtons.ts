import { Component } from 'angular2/angular2';

@Component({
  selector: 'social-buttons',
  template: `
    <a class="elsewhere_link fa fa-envelope" href="mailto:hi@carlosliu.net" target="_blank" title="Email"></a>
    <a class="elsewhere_link fa fa-instagram" href="http://instagram.com/" target="_blank" title="Instagram"></a>
    <a class="elsewhere_link fa fa-twitter" href="http://twitter.com" target="_blank" title="Twitter"></a>
    <a class="elsewhere_link fa fa-weibo" href="http://weibo.com" target="_blank" title="新浪微博"></a>
  `
})
export class SocialButtonsComponent {
  // constructor() { }
}