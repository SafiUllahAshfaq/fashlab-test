import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject, } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { InvoiceService } from 'src/app/services/invoice.service';
import { IInvoice } from './table.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  private readonly refreshClick$ = new Subject<void>();

  @Input() invoices$: Observable<IInvoice[]>;
  headers: string[];

  constructor(private _invoice: InvoiceService) {
    this.headers = [
      'Internal Invoice ID',
      'Due Date',
      'Upload Date',
      'Amount',
      'Selling Price',
    ]

    this.invoices$ = this.refreshClick$.pipe(
      // fake emission of a click so that initial data can be loaded
      startWith([]),
      switchMap(() => this._invoice.invoices())
    );
  }

  refreshData() {
    this.refreshClick$.next();
  }
}
