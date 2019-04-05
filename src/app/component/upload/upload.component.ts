import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { Upload } from '../../models/upload.model';
import * as _ from 'lodash';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  public files: FileList;
  public upload: Upload;
  public title: string;
  public description: string;
  public tags: string;

  constructor(private uploadService: UploadService) { }

  public handleFiles(event): void {
    this.files = event.target.files;
  }

  public uploadFiles(): void {
    const filesToUpload = this.files;
    const filesIdx = _.range(filesToUpload.length);
    _.each(filesIdx, (idx) => {
      this.upload = new Upload(filesToUpload[idx]);
      this.uploadService.uploadFile(this.upload, this.title, this.description, this.tags);
    })

  }

}
