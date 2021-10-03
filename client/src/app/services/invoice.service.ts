import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  api: string;
  endpoint: string;

  constructor(public http: HttpClient) {
    this.api = environment.apiURL + '/' + environment.apiVersion + '/';
    this.endpoint = this.api + 'invoice';
  }

  invoices() {
    return this.http.get<any>(this.endpoint);
  }

  uploadFile(form: FormData) {
    return this.http.post(this.endpoint, form);
  }
}
