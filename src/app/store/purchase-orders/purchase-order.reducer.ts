import { createReducer, on } from '@ngrx/store';

import {
  loadPurchaseOrders,
  loadPurchaseOrdersSuccess,
  loadPurchaseOrdersFailure,
  selectPurchaseOrder,
  addPurchaseOrder,
  addPurchaseOrderSuccess,
  addPurchaseOrderFailure,
  updatePurchaseOrder,
  updatePurchaseOrderSuccess,
  updatePurchaseOrderFailure,
  deletePurchaseOrder,
  deletePurchaseOrderSuccess,
  deletePurchaseOrderFailure,
} from './purchase-order.actions';
import { initialPurchaseOrderState, PurchaseOrderState } from './purchase-order.state';
import { PurchaseOrder } from '../../models/model';

export const purchaseOrderReducer = createReducer(
  initialPurchaseOrderState,
  on(loadPurchaseOrders, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
    successMessage: null,
  })),
  on(loadPurchaseOrdersSuccess, (state, action) => ({
    ...state,
    purchaseOrders: action.purchaseOrders.map((order: PurchaseOrder) => ({
      ...order,
      shipping_address: { ...order.shipping_address },
    })),
    loading: false,
    loaded: true,
  })),
  on(loadPurchaseOrdersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(selectPurchaseOrder, (state, action) => ({
    ...state,
    selectedPurchaseOrder: { ...action.purchaseOrder },
  })),
  on(addPurchaseOrder, (state) => ({
    ...state,
    loading: true,
    error: null,
    successMessage: null,
  })),
  on(addPurchaseOrderSuccess, (state, action) => ({
    ...state,
    purchaseOrders: [
      ...state.purchaseOrders,
      {
        ...action.purchaseOrder,
        shipping_address: { ...action.purchaseOrder.shipping_address },
        order_id: action.inserted_order_id,
      },
    ],
    loading: false,
    successMessage: action.successMessage,
  })),
  on(addPurchaseOrderFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(updatePurchaseOrder, (state) => ({
    ...state,
    loading: true,
    error: null,
    successMessage: null,
  })),
  on(updatePurchaseOrderSuccess, (state, action) => ({
    ...state,
    purchaseOrders: state.purchaseOrders.map((order: PurchaseOrder) =>
      order.order_id === action.purchaseOrder.order_id
        ? {
            ...action.purchaseOrder,
            shipping_address: { ...action.purchaseOrder.shipping_address },
          }
        : order,
    ),
    loading: false,
    successMessage: action.successMessage,
  })),
  on(updatePurchaseOrderFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(deletePurchaseOrder, (state) => ({
    ...state,
    loading: true,
    error: null,
    successMessage: null,
  })),
  on(deletePurchaseOrderSuccess, (state, action) => ({
    ...state,
    purchaseOrders: state.purchaseOrders.filter(
      (order: PurchaseOrder) => order.order_id !== action.order_id,
    ),
    loading: false,
    successMessage: action.successMessage,
  })),
  on(deletePurchaseOrderFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
);
