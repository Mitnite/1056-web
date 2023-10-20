import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-students-review',
  templateUrl: './students-review.component.html',
  styleUrls: ['./students-review.component.scss']
})
export class StudentsReviewComponent implements OnInit {

  @Output() deny: EventEmitter<any> = new EventEmitter();

  @Input() number: number;

  @Input() studentsId: number;

  @Input() reviewText: string;

  ngOnInit(): void {
    const stars = this.number;
    stars ? this.number = stars : this.number = 0;

  }

}
