import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { IInvoice } from './components/table/table.interface';
import { InvoiceService } from './services/invoice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';
  invoices$: Observable<IInvoice[]>;

  // observables: Subscription[] = [];

  constructor(private _invoice: InvoiceService) { this.invoices$ = this._invoice.invoices(); }

  ngOnInit() {
    // this.observables.push(this._invoice.invoices().subscribe(invoices => {
    //   this.invoices = invoices[0];
    // }))
  }
}
