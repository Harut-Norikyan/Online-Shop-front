import { takeLatest, put, call } from 'redux-saga/effects';
import _ from 'lodash';
// eslint-disable-next-line import/no-named-as-default
import Api from '../../Api';
import {
  SEND_PRODUCTS_REQUEST,
  SEND_PRODUCTS_SUCCESS,
  SEND_PRODUCT_FAIL,
  GET_PRODUCTS_ORDERS_REQUEST,
  GET_PRODUCTS_ORDERS_SUCCESS,
  GET_PRODUCT_ORDERS_FAIL,
  DELETE_PRODUCTS_REQUEST,
  DELETE_PRODUCTS_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  PAYMENT_ORDER_REQUEST,
  PAYMENT_ORDER_SUCCESS,
  PAYMENT_ORDER_FAIL,
  PAYMENT_PAYED_REQUEST,
  PAYMENT_PAYED_SUCCESS,
  PAYMENT_PAYED_FAIL,
  SEND_TO_PAYMENT_REQUEST,
  SEND_TO_PAYMENT_SUCCESS,
  SEND_TO_PAYMENT_FAIL,
} from '../actions/orders';
import {showLoading,hideLoading} from "react-redux-loading-bar";


export default function* watcher() {
  yield takeLatest(SEND_PRODUCTS_REQUEST, handleSendProduct);
  yield takeLatest(GET_PRODUCTS_ORDERS_REQUEST, handleGetProduct);
  yield takeLatest(DELETE_PRODUCTS_REQUEST, handleDeleteOrder);
  yield takeLatest(UPDATE_ORDER_REQUEST, handleUpdateOrder);
  yield takeLatest(PAYMENT_ORDER_REQUEST, handlePayOrder);
  yield takeLatest(PAYMENT_PAYED_REQUEST, handlePayedOrder);
  yield takeLatest(SEND_TO_PAYMENT_REQUEST, handleSandToPayment);
}

function* handleSandToPayment(action) {
  try {
    const { data } = action.payload;
    const toPayment = yield call(Api.sendToPayment, data);
    yield put({
      type: SEND_TO_PAYMENT_SUCCESS,
      payload: { toPayment },
    });
  } catch (e) {
    yield put({
      type: SEND_TO_PAYMENT_FAIL,
      message: e.message,
      error: _.get(e, 'response.data'),
    });
  }
}


function* handleUpdateOrder(action) {
  try {
    const { orderId, data } = action.payload;
    const orderUpload = yield call(Api.uploadOrder, orderId, data);
    yield put({
      type: UPDATE_ORDER_SUCCESS,
      payload: { orderUpload },
    });
  } catch (e) {
    yield put({
      type: UPDATE_ORDER_FAIL,
      message: e.message,
      error: _.get(e, 'response.data'),
    });
  }
}
function* handlePayedOrder() {
  try {
    const payed = yield call(Api.paymentPayed);
    yield put({
      type: PAYMENT_PAYED_SUCCESS,
      payload: { payed },
    });
  } catch (e) {
    yield put({
      type: PAYMENT_PAYED_FAIL,
      message: e.message,
      error: _.get(e, 'response.data'),
    });
  }
}
function* handleSendProduct(action) {
  try {
    const { data } = action.payload;
    const order = yield call(Api.sendProduct, data);
    yield put({
      type: SEND_PRODUCTS_SUCCESS,
      payload: { order },
    });
    const orders = yield call(Api.getProductFromOrders);
    yield put({
      type: GET_PRODUCTS_ORDERS_SUCCESS,
      payload: { orders },
    });
  } catch (e) {
    yield put({
      type: SEND_PRODUCT_FAIL,
      message: e.message,
      error: _.get(e, 'response.data'),
    });
  }
}

function* handleGetProduct() {
  try {
    const orders = yield call(Api.getProductFromOrders);
    yield put({
      type: GET_PRODUCTS_ORDERS_SUCCESS,
      payload: { orders },
    });
  } catch (e) {
    yield put({
      type: GET_PRODUCT_ORDERS_FAIL,
      message: e.message,
      error: _.get(e, 'response.data'),
    });
  }
}

function* handleDeleteOrder(action) {
  try {
    const { orderId } = action.payload;
    const statusOrder = yield call(Api.deleteOrder, orderId);
    yield put({
      type: DELETE_PRODUCTS_SUCCESS,
      payload: { statusOrder, orderId },
    });
  } catch (e) {
    yield put({
      type: DELETE_PRODUCT_FAIL,
      message: e.message,
      error: _.get(e, 'response.data'),
    });
  }
}

function* handlePayOrder(action) {
  try {
    const { total, items } = action.payload;
    yield put(showLoading());

    const data = yield call(Api.paymentResult, total, items);
    yield put({
      type: PAYMENT_ORDER_SUCCESS,
      payload: { data },
    });
    yield put(hideLoading());

  } catch (e) {
    yield put({
      type: PAYMENT_ORDER_FAIL,
      message: e.message,
      error: _.get(e, 'response.data'),
    });
    yield put(hideLoading());

  }
}
