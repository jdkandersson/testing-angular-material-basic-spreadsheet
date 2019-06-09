// order-table.component.ts
import { Component, OnInit } from '@angular/core';

import { OrderTable } from './order-table.model';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit {
  orderTable: OrderTable;
  productHeader = 'Product';
  headers: string[];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderTable = this.orderService.getOrderTable();
    this.headers = [this.productHeader].concat(this.orderTable.headers);
  }

}
