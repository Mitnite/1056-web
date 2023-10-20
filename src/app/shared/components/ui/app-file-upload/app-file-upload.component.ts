import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './app-file-upload.component.html',
  styleUrls: ['./app-file-upload.component.scss']
})
export class AppFileUploadComponent {

  @Input()
  requiredFileType: string;
  @Output() file: EventEmitter<any> = new EventEmitter<any>();

  fileName = '';
  uploadProgress: number;
  uploadSub: Subscription;

  constructor(private http: HttpClient) {
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      this.file.emit(file);
    }
  }

  cancelUpload() {
    this.reset();
    this.uploadSub.unsubscribe();
  }

  reset() {
    this.fileName = '';
    this.uploadProgress = null;
    this.uploadSub = null;
  }

}

