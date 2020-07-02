import { takeLatest, put, call } from 'redux-saga/effects';
import _ from 'lodash';
// eslint-disable-next-line import/no-named-as-default
import Api from '../../Api';
import {
  GET_ONE_PRODUCT_REQUEST,
  GET_ONE_PRODUCT_SUCCESS,
  GET_ONE_PRODUCT_FAIL,
  RATE_PRODUCTS_FAIL,
  RATE_PRODUCTS_REQUEST,
  RATE_PRODUCTS_SUCCESS,
} from '../actions/getProductById';
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export default function* watcher() {
  yield takeLatest(GET_ONE_PRODUCT_REQUEST, handleGetOneProduct);
  yield takeLatest(RATE_PRODUCTS_REQUEST, handleRateProducts);
}
function* handleGetOneProduct(action) {
  try {
    yield put(showLoading());

    const { id } = action.payload;
    const { data } = yield call(Api.getProductById, id);

    yield put({
      type: GET_ONE_PRODUCT_SUCCESS,
      payload: { data },
    });
    yield put(hideLoading());

  } catch (e) {
    yield put({
      type: GET_ONE_PRODUCT_FAIL,
      message: e.message,
      error: _.get(e, 'response.data'),
    });
  }
}
function* handleRateProducts(action) {
  try {
    const { rating, id } = action.payload;
    yield put(showLoading());

    yield call(Api.rateProduct, rating, id);
    const { data } = yield call(Api.getProductById, id);
    yield put({
      type: RATE_PRODUCTS_SUCCESS,
      payload: { data },

    });
    yield put(hideLoading());

  } catch (e) {
    yield put({
      type: RATE_PRODUCTS_FAIL,
      message: e.message,
      error: _.get(e, 'response.data'),
    });
    yield put(hideLoading());

  }
}
