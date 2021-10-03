import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

import { InvoiceService } from 'src/app/services/invoice.service';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent {

  file: any;
  fileName: string;
  fileType: string;
  isSuccess: boolean;

  fileUploadUrl: string;

  constructor(private _invoice: InvoiceService, private _nzMessage: NzMessageService) {
    this.fileName = '';
    this.fileType = 'csv';
    this.isSuccess = false;
    this.fileUploadUrl = this._invoice.endpoint
  }

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    console.log({ file, fileList });

    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this._nzMessage.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this._nzMessage.error(`${file.name} file upload failed.`);
    }
  }
}
