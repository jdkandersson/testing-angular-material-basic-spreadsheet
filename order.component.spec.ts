// order.component.spec.ts
import { TestBed, ComponentFixture } from '@angular/core/testing';

import { OrderComponent } from './order.component';
import { DebugElement } from '@angular/core';

describe('OrderComponent', () => {
    let fixture: ComponentFixture<OrderComponent>;
    let component: OrderComponent;
    let debugElement: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [OrderComponent]
        });

        fixture = TestBed.createComponent(OrderComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    describe('order null', () => {
        it('should display empty template.', () => {
            // Setting order to null
            component.order = null;

            // Triggering change detection
            fixture.detectChanges();

            // Checking template
            expect(debugElement.nativeElement.textContent).toEqual('');
        });
    });

    describe('order not null', () => {
        it('should display order value formatted as number.', () => {
            // Setting order to null
            component.order = {date: '2000-01-01', product: 'product 1', value: 1000};

            // Triggering change detection
            fixture.detectChanges();

            // Checking template
            expect(debugElement.nativeElement.textContent).toEqual('1,000');
        });
    });
});
