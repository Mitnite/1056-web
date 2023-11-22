import { Component } from '@angular/core';
import { EMAIL_LOCALIZATION } from '../../config/constants';
import { GET_HELP_LOCALIZATION } from './config/constants';

@Component({
    selector: 'app-get-help',
    templateUrl: './get-help.component.html',
    styleUrls: ['./get-help.component.scss']
})
export class GetHelpComponent {

    isShow = false;

    isEmail = false;

    problems: {text: string}[] = [];

    title: string | null = null;

    protected readonly EMAIL_LOCALIZATION = EMAIL_LOCALIZATION;
    protected readonly GET_HELP_LOCALIZATION = GET_HELP_LOCALIZATION;

    isShowHandler() {
        this.isShow = !this.isShow;
    }

    setProblemHandler(problem: string) {
        switch (problem) {
            case 'org':
                this.isShowHandler();
                this.isEmail = true;
                this.problems = GET_HELP_LOCALIZATION.ORGANIZATION_PROBLEM;
                this.title = 'Organization problem';
                break;
            case 'tech':
                this.isShowHandler();
                this.isEmail = true;
                this.problems = GET_HELP_LOCALIZATION.TECHNICAL_PROBLEM;
                this.title = 'Technical problem';
                break;
            case 'faq':
                this.isShowHandler();
                this.isEmail = false;
                this.problems = GET_HELP_LOCALIZATION.FAQ;
                this.title = 'FAQ';
                break;
        }
    }

}
