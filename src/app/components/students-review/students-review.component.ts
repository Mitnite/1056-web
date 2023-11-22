import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GLOBAL_LOCALIZATION } from '../../config/constants';

@Component({
    selector: 'app-students-review',
    templateUrl: './students-review.component.html',
    styleUrls: ['./students-review.component.scss']
})
export class StudentsReviewComponent {

    @Output() deny: EventEmitter<any> = new EventEmitter();

    @Input() number = 0;

    @Input() studentsId: number;

    @Input() reviewText: string;

    protected readonly REVIEW: string = 'Student\'s review ';
    protected readonly SCORE: string = 'Score';
    protected readonly GLOBAL_LOCALIZATION = GLOBAL_LOCALIZATION;

}
