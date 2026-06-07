import { createReducer, on } from '@ngrx/store';
import {
  loadMaterialLots,
  loadMaterialLotsSuccess,
  loadMaterialLotsFailure,
  selectMaterialLot,
  addMaterialLotSuccess,
  deleteMaterialLotSuccess,
  addMaterialLot,
  addMaterialLotFailure,
  deleteMaterialLotFailure,
  deleteMaterialLot,
  updateMaterialLot,
  updateMaterialLotSuccess,
  updateMaterialLotFailure,
} from './material-lot.actions';
import { initialMaterialLotState, MaterialLotState } from './material-lot.state';
import { MaterialLot } from '../../models/model';

export const materialLotReducer = createReducer(
  initialMaterialLotState,
  on(loadMaterialLots, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
    successMessage: null,
  })),
  on(loadMaterialLotsSuccess, (state, action) => ({
    ...state,
    materialLots: action.materialLots.map((lot) => ({ ...lot })),
    loading: false,
    loaded: true,
  })),
  on(loadMaterialLotsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(selectMaterialLot, (state, action) => ({
    ...state,
    selectedMaterialLot: { ...action.materialLot },
  })),
  on(addMaterialLot, (state) => ({
    ...state,
    loading: true,
    error: null,
    successMessage: null,
  })),
  on(addMaterialLotSuccess, (state, action) => ({
    ...state,
    materialLots: [...state.materialLots, { ...action.materialLot }],
    loading: false,
    successMessage: action.successMessage,
  })),
  on(addMaterialLotFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(updateMaterialLot, (state) => ({
    ...state,
    loading: true,
    error: null,
    successMessage: null,
  })),
  on(updateMaterialLotSuccess, (state, action) => ({
    ...state,
    materialLots: state.materialLots.map((lot: MaterialLot) =>
      lot.lot_number === action.materialLot.lot_number ? { ...action.materialLot } : lot,
    ),
    loading: false,
    successMessage: action.successMessage,
  })),
  on(updateMaterialLotFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(deleteMaterialLot, (state) => ({
    ...state,
    loading: true,
    error: null,
    successMessage: null,
  })),
  on(deleteMaterialLotSuccess, (state, action) => ({
    ...state,
    materialLots: state.materialLots.filter(
      (lot: MaterialLot) => lot.lot_number !== action.lot_number,
    ),
    loading: false,
    successMessage: action.successMessage,
  })),
  on(deleteMaterialLotFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
);
