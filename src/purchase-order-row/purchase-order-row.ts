import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { PurchaseOrder } from '../app/models/model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purchase-order-row',
  imports: [CommonModule],
  templateUrl: './purchase-order-row.html',
  styleUrl: './purchase-order-row.css',
})
export class PurchaseOrderRow implements OnInit {
  ngOnInit() {}
  @Input() purchaseOrder: PurchaseOrder = {
    name: '',
    lot_number: '',
    quantity: '',
    unit_price: '',
    shipping_address: { street: '', city: '', state: '', zip_code: '', country: '' },
    order_date: '',
  };
  @Output() selectPurchaseOrder = new EventEmitter<PurchaseOrder>();
  @Output() deletePurchaseOrder = new EventEmitter<PurchaseOrder>();

  selectThisPurchaseOrder() {
    this.selectPurchaseOrder.emit(this.purchaseOrder);
  }

  deleteThisPurchaseOrder() {
    this.deletePurchaseOrder.emit(this.purchaseOrder);
  }
}
