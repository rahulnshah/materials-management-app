import { Component, EventEmitter, inject, Input, OnInit, Output, output } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectHasOrdersForLot } from '../app/store/purchase-orders/purchase-order.selectors';
import { MaterialLot } from '../app/models/model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-material-lot-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './material-lot-row.html',
  styleUrl: './material-lot-row.css',
})
export class MaterialLotRow implements OnInit {
  private materialLotStore = inject(Store);

  hasOrders$: Observable<boolean> = new Observable<boolean>();

  @Input() materialLot: MaterialLot = { lot_number: '', material_id: '' };

  @Output() selectMaterialLot = new EventEmitter<MaterialLot>();
  @Output() deleteMaterialLot = new EventEmitter<MaterialLot>();
  @Output() viewOrders = new EventEmitter<MaterialLot>();

  ngOnInit() {
    this.hasOrders$ = this.materialLotStore.select(
      selectHasOrdersForLot(this.materialLot.lot_number),
    );
  }
  viewOrdersForLot() {
    this.viewOrders.emit(this.materialLot);
  }

  selectThisMaterialLot() {
    this.selectMaterialLot.emit(this.materialLot);
  }

  deleteThisMaterialLot() {
    this.deleteMaterialLot.emit(this.materialLot);
  }
}
