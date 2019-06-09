// order-table.component.spec.ts
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material';

import { OrderTableComponent } from './order-table.component';
import { Order } from './order.model';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  template: `
    {{ order.date }}
    {{ order.product }}
    {{ order.value }}
  `
})
class TestOrderComponent {
  @Input() order: Order;
}

describe('OrderTableComponent', () => {
  let fixture: ComponentFixture<OrderTableComponent>;
  let component: OrderTableComponent;
  let nativeElement: HTMLElement;
  let orderServiceSpy: jasmine.SpyObj<OrderService>;

  beforeEach(() => {
    // Creating mock OrderService
    orderServiceSpy = jasmine.createSpyObj('OrderService', ['getOrderTable']);

    TestBed.configureTestingModule({
      declarations: [OrderTableComponent, TestOrderComponent],
      providers: [{provide: OrderService, useValue: orderServiceSpy}],
      imports: [MatTableModule]
    });

    fixture = TestBed.createComponent(OrderTableComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
  });

  describe('TestOrderComponent', () => {
    it('should create', () => {
      // Defining getOrderTable return value
      orderServiceSpy.getOrderTable.and.returnValue({
        headers: [],
        rowLabels: [],
        orders: [],
        orderMap: {}
      });

      // Triggering change detection
      fixture.detectChanges();

      // Checking component create
      expect(component).toBeTruthy();
    });

    describe('construction', () => {
      it('should call getOrderTable on OrderService', () => {
        // Defining getOrderTable return value
        orderServiceSpy.getOrderTable.and.returnValue({
          headers: [],
          rowLabels: [],
          orders: [],
          orderMap: {}
        });

        // Triggering change detection
        fixture.detectChanges();

        // Checking getOrderTable call
        expect(orderServiceSpy.getOrderTable).toHaveBeenCalledWith();
      });
    });

    describe('empty table', () => {
      it('should display empty template.', () => {
        // Defining getOrderTable return value
        orderServiceSpy.getOrderTable.and.returnValue({
          headers: [],
          rowLabels: [],
          orders: [],
          orderMap: {}
        });

        // Triggering change detection
        fixture.detectChanges();

        // Checking template
        expect(nativeElement.textContent).toEqual('');
      });
    });

    describe('single item table', () => {
      it('should display Product and date header', () => {
        // Defining getOrderTable return value
        const order = {
          date: '2000-01-01',
          product: 'product 1',
          value: 1
        };
        orderServiceSpy.getOrderTable.and.returnValue({
          headers: ['2000-01-01'],
          rowLabels: ['product 1'],
          orders: [order],
          orderMap: {'2000-01-01': {'product 1': order}}
        });

        // Triggering change detection
        fixture.detectChanges();

        // Checking headers in template
        const trs = nativeElement.querySelectorAll('tr');
        expect(trs.length).toEqual(2);
        const ths = trs.item(0).querySelectorAll('th');
        expect(ths.length).toEqual(2);
        ['Product', 'Jan 1, 2000'].forEach((expectedHeader, idx) => expect(ths.item(idx).innerText).toEqual(expectedHeader));
      });

      it('should display single row with Order', () => {
        // Defining getOrderTable return value
        const order = {
          date: '2000-01-01',
          product: 'product 1',
          value: 1
        };
        orderServiceSpy.getOrderTable.and.returnValue({
          headers: ['2000-01-01'],
          rowLabels: ['product 1'],
          orders: [order],
          orderMap: {'2000-01-01': {'product 1': order}}
        });

        // Triggering change detection
        fixture.detectChanges();

        // Checking headers in template
        const trs = nativeElement.querySelectorAll('tr');
        expect(trs.length).toEqual(2);
        const tds = trs.item(1).querySelectorAll('td');
        expect(tds.length).toEqual(2);
        ['product 1', '2000-01-01 product 1 1'].forEach((expectedItem, idx) => expect(tds.item(idx).innerText).toEqual(expectedItem));
      });
    });

    describe('multiple item table with single row', () => {
      it('should display Product and date headers', () => {
        // Defining getOrderTable return value
        const orders = [{
          date: '2000-01-01',
          product: 'product 1',
          value: 1
        }, {
          date: '2000-01-02',
          product: 'product 2',
          value: 2
        }];
        orderServiceSpy.getOrderTable.and.returnValue({
          headers: ['2000-01-01', '2000-01-02'],
          rowLabels: ['product 1'],
          orders: orders,
          orderMap: {
            '2000-01-01': {'product 1': orders[0]},
            '2000-01-02': {'product 1': orders[1]}
          }
        });

        // Triggering change detection
        fixture.detectChanges();

        // Checking headers in template
        const trs = nativeElement.querySelectorAll('tr');
        expect(trs.length).toEqual(2);
        const ths = trs.item(0).querySelectorAll('th');
        expect(ths.length).toEqual(3);
        [
          'Product', 'Jan 1, 2000', 'Jan 2, 2000'
        ].forEach((expectedHeader, idx) => expect(ths.item(idx).innerText).toEqual(expectedHeader));
      });

      it('should display single row with Orders', () => {
        // Defining getOrderTable return value
        const orders = [{
          date: '2000-01-01',
          product: 'product 1',
          value: 1
        }, {
          date: '2000-01-02',
          product: 'product 1',
          value: 2
        }];
        orderServiceSpy.getOrderTable.and.returnValue({
          headers: ['2000-01-01', '2000-01-02'],
          rowLabels: ['product 1'],
          orders: orders,
          orderMap: {
            '2000-01-01': {'product 1': orders[0]},
            '2000-01-02': {'product 1': orders[1]}
          }
        });

        // Triggering change detection
        fixture.detectChanges();

        // Checking headers in template
        const trs = nativeElement.querySelectorAll('tr');
        expect(trs.length).toEqual(2);
        const ths = trs.item(1).querySelectorAll('td');
        expect(ths.length).toEqual(3);
        [
          'product 1', '2000-01-01 product 1 1', '2000-01-02 product 1 2'
        ].forEach((expectedItem, idx) => expect(ths.item(idx).innerText).toEqual(expectedItem));
      });
    });

    describe('multiple item table with single column', () => {
      it('should display Product and date header', () => {
        // Defining getOrderTable return value
        const orders = [{
          date: '2000-01-01',
          product: 'product 1',
          value: 1
        }, {
          date: '2000-01-01',
          product: 'product 1',
          value: 2
        }];
        orderServiceSpy.getOrderTable.and.returnValue({
          headers: ['2000-01-01'],
          rowLabels: ['product 1', 'product 2'],
          orders: orders,
          orderMap: {'2000-01-01': {
            'product 1': orders[0],
            'product 2': orders[1]
          }}
        });

        // Triggering change detection
        fixture.detectChanges();

        // Checking headers in template
        const trs = nativeElement.querySelectorAll('tr');
        expect(trs.length).toEqual(3);
        const ths = trs.item(0).querySelectorAll('th');
        expect(ths.length).toEqual(2);
        ['Product', 'Jan 1, 2000'].forEach((expectedHeader, idx) => expect(ths.item(idx).innerText).toEqual(expectedHeader));
      });

      it('should display multiple rows with Orders', () => {
        // Defining getOrderTable return value
        const orders = [{
          date: '2000-01-01',
          product: 'product 1',
          value: 1
        }, {
          date: '2000-01-01',
          product: 'product 2',
          value: 2
        }];
        orderServiceSpy.getOrderTable.and.returnValue({
          headers: ['2000-01-01'],
          rowLabels: ['product 1', 'product 2'],
          orders: orders,
          orderMap: {'2000-01-01': {
            'product 1': orders[0],
            'product 2': orders[1]
          }}
        });

        // Triggering change detection
        fixture.detectChanges();

        // Checking headers in template
        const trs = nativeElement.querySelectorAll('tr');
        expect(trs.length).toEqual(3);
        let tds = trs.item(1).querySelectorAll('td');
        expect(tds.length).toEqual(2);
        ['product 1', '2000-01-01 product 1 1'].forEach((expectedItem, idx) => expect(tds.item(idx).innerText).toEqual(expectedItem));
        tds = trs.item(2).querySelectorAll('td');
        expect(tds.length).toEqual(2);
        ['product 2', '2000-01-01 product 2 2'].forEach((expectedItem, idx) => expect(tds.item(idx).innerText).toEqual(expectedItem));
      });
    });
  });
});
