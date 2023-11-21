import { Component } from '@angular/core';
import { orgProblem, TechProblem, FAQ, EMAIL_LOCALIZATION } from '../../config/constants';

@Component({
  selector: 'app-get-help',
  templateUrl: './get-help.component.html',
  styleUrls: ['./get-help.component.scss']
})
export class GetHelpComponent {

  isShow = false;
  isEmail = false;
  problems = [];
  title = '';

  protected readonly EMAIL_LOCALIZATION = EMAIL_LOCALIZATION;

  isShowHandler() {
    this.isShow = !this.isShow;
  }

  setProblemHandler(problem: string) {
    switch (problem) {
      case 'org':
        this.isShowHandler();
        this.isEmail = true;
        this.problems = orgProblem;
        this.title = 'Organization problem';
        break;
      case 'tech':
        this.isShowHandler();
        this.isEmail = true;
        this.problems = TechProblem;
        this.title = 'Technical problem';
        break;
      case 'faq':
        this.isShowHandler();
        this.isEmail = false;
        this.problems = FAQ;
        this.title = 'FAQ';
        break;
    }
  }

}
