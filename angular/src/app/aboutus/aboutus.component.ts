import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  faGit,
  faGitSquare,
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css'],
})
export class AboutusComponent implements OnInit {
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faGitSquare = faGitSquare;
  faGit = faGit;

  constructor(public translate: TranslateService) { }

  ngOnInit(): void { }
}
