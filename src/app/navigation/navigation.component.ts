import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'fi', 'se']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang()!;
    translate.use(browserLang.match(/en|fi|se/) ? browserLang : 'en');
  }

  ngOnInit(): void {
  }

}
