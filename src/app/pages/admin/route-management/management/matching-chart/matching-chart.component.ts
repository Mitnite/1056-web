import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ExportService } from '@core/export.service';
import { AuthService } from '@core/auth.service';
import { EditBuddy, EditStudent, IMatchingChart } from '../../../../../interfaces';
import { GLOBAL_LOCALIZATION, POPUP_LOCALIZATION } from '../../../../../config/constants';

@Component({
    selector: 'app-matching-chart',
    templateUrl: './matching-chart.component.html',
    styleUrls: ['./matching-chart.component.scss']
})
export class MatchingChartComponent implements OnInit {

    allMatches: IMatchingChart[] = [];
    isEdit = false;
    isShowStudentInfo = false;
    isShowBuddyInfo = false;
    addToDelete = false;
    isShowScore = false;
    score = 0;
    studentsId = -1;
    index = -1;
    id = 0;

    reviewText = 'Some reviewText';

    buddyInfo: EditBuddy | null = null;
    studentInfo: EditStudent | null = null;
    @ViewChild('matchingChartTable') userTable: ElementRef;

    protected readonly HEADER: string = 'Matching chart';
    protected readonly DELETE_PAIR: string = 'Delete pair';

    protected readonly POPUP_LOCALIZATION = POPUP_LOCALIZATION;
    protected readonly GLOBAL_LOCALIZATION = GLOBAL_LOCALIZATION;

    constructor(private authService: AuthService,
                private exportService: ExportService,
    ) {
    }

    ngOnInit(): void {
        this.loadData();
    }

    isShowStudentInfoHandler(id: number) {
        this.isShowStudentInfo = true;
        this.authService.getById(id)
            .then((response) => {
                this.studentInfo = response;
            });
    }

    isShowBuddyInfoHandler(id: number) {
        this.isShowBuddyInfo = true;
        this.authService.getById(id)
            .then((response) => {
                this.buddyInfo = response;
            });
    }

    loadData() {
        this.authService.getAllMatches()
            .then((response) => {
                this.allMatches = response;
                console.log(this.allMatches);
            });
    }


    exportElmToExcel(): void {
        this.exportService.exportTableElmToExcel(this.userTable, 'matchingChartTable');
    }

    acceptHandler() {
        this.addToDelete = false;
        this.authService.deleteMatch(this.allMatches[this.index].foreignStudent.id, this.allMatches[this.index].buddy.id)
            .then(() => {
                this.loadData();
            });
    }

    setIdHandler(i: number, id: number) {
        this.index = i;
        this.id = id;
    }

    isEditHandler() {
        this.isEdit = false;
        this.id = 0;
        this.index = -1;
    }

    showScoreHandler(score: number, id: number, reviewText: string) {
        this.score = score;
        this.studentsId = id;
        this.isShowScore = true;
        reviewText.length > 0 ? this.reviewText = reviewText : this.reviewText = 'Some review Some review Some review Some review Some review Some reviewSome reviewSome reviewSome reviewSome reviewSome reviewSome reviewSome review';
    }


}
