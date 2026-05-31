import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  addMaterialLot,
  deleteMaterialLot,
  loadMaterialLots,
  selectMaterialLot,
  updateMaterialLot,
} from '../app/store/material-lots/material-lot.actions';
import { MaterialLot } from '../app/models/model';
import {
  selectAllMaterialLots,
  selectMaterialLotError,
  selectMaterialLotSuccessMessage,
  selectSelectedMaterialLot,
} from '../app/store/material-lots/material-lot.selectors';
import { Router } from '@angular/router';
import { DataShareService } from '../app/core/services/data-share.service';
import { Subject, takeUntil } from 'rxjs';
import { MaterialLotRow } from '../material-lot-row/material-lot-row';

@Component({
  selector: 'app-material-lot-editor',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MaterialLotRow],
  templateUrl: './material-lot-editor.html',
  styleUrl: './material-lot-editor.css',
  standalone: true,
})
export class MaterialLotEditor implements OnInit {
  private formBuilder = inject(FormBuilder);
  private materialLotStore = inject(Store);
  private router = inject(Router);
  private dataShareService = inject(DataShareService);
  private destroy$: Subject<void> = new Subject<void>();

  alertMessage = '';
  // Initialize the form with values of selected material lot or empty values for new lot
  materialLotForm = this.formBuilder.group({
    lot_number: [''],
    material_id: [''],
  });

  materialLot$ = this.materialLotStore.select(selectSelectedMaterialLot);
  materialLots$ = this.materialLotStore.select(selectAllMaterialLots);
  materialLotSuccessMessage$ = this.materialLotStore.select(selectMaterialLotSuccessMessage);
  materialLotError$ = this.materialLotStore.select(selectMaterialLotError);

  ngOnInit() {
    this.materialLotStore.dispatch(loadMaterialLots());
    this.materialLot$.subscribe((materialLot) => {
      if (materialLot) {
        this.materialLotForm.patchValue({
          lot_number: materialLot.lot_number,
          material_id: materialLot.material_id,
        });
      } else {
        this.materialLotForm.reset();
      }
    });
    this.dataShareService.sharingData$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.alertMessage = data.sharedData;
      setTimeout(() => {
        this.alertMessage = '';
      }, 3000);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSelect(materialLot: MaterialLot) {
    this.materialLotStore.dispatch(selectMaterialLot({ materialLot }));
  }

  onUpdate() {
    this.dataShareService.setData(
      'Update Button Clicked for Lot Number: ' + this.materialLotForm.value.lot_number!,
    );
    this.materialLotStore.dispatch(
      updateMaterialLot({
        lot_number: this.materialLotForm.value.lot_number!,
        materialLot: {
          lot_number: this.materialLotForm.value.lot_number!,
          material_id: this.materialLotForm.value.material_id!,
        },
      }),
    );
  }

  onSubmit() {
    console.log('Material Lot Form Submitted', this.materialLotForm.value);
    this.dataShareService.setData(
      'Form Submitted with values: ' + JSON.stringify(this.materialLotForm.value),
    );
    this.materialLotStore.dispatch(
      addMaterialLot({
        materialLot: {
          lot_number: this.materialLotForm.value.lot_number!,
          material_id: this.materialLotForm.value.material_id!,
        },
      }),
    );
  }

  onDelete(materialLot: MaterialLot) {
    this.dataShareService.setData(
      'Delete Button Clicked for Lot Number: ' + materialLot.lot_number,
    );
    // Implement delete functionality here
    this.materialLotStore.dispatch(deleteMaterialLot({ lot_number: materialLot.lot_number }));
  }

  onViewOrders(materialLot: MaterialLot) {
    // Implement view orders functionality here - navigate to orders page with lot_number as parameter
    this.router.navigate(['/orders', materialLot.lot_number]);
  }
}
