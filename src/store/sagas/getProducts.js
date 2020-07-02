import { takeLatest, put, call } from 'redux-saga/effects';
import _ from 'lodash';
// eslint-disable-next-line import/no-named-as-default
import Api from '../../Api';
import {
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  NEW_PRODUCTS_FAIL,
  NEW_PRODUCTS_REQUEST,
  NEW_PRODUCTS_SUCCESS,
  POPULAR_PRODUCTS_FAIL,
  POPULAR_PRODUCTS_REQUEST,
  POPULAR_PRODUCTS_SUCCESS,
  SEARCH_PRODUCT_FAIL,
  SEARCH_PRODUCT_REQUEST,
  SEARCH_PRODUCT_SUCCESS,
} from '../actions/getProducts';
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export default function* watcher() {
  yield takeLatest(GET_PRODUCTS_REQUEST, handleGetProducts);
  yield takeLatest(SEARCH_PRODUCT_REQUEST, handleSearchProduct);
  yield takeLatest(NEW_PRODUCTS_REQUEST, handleGetNewProducts);
  yield takeLatest(POPULAR_PRODUCTS_REQUEST, handleGetPopularProducts);
}

function* handleGetProducts(action) {
  try {
    const { page, params } = action.payload;
    yield put(showLoading());
    const { data } = yield call(Api.getProducts, page, params);
    yield put({
      type: GET_PRODUCTS_SUCCESS,
      payload: { data },

    });
    yield put(hideLoading());

  } catch (e) {
    yield put(hideLoading());

    yield put({
      type: GET_PRODUCTS_FAIL,
      message: e.message,
      error: _.get(e, 'response.data'),

    });
  }
}

function* handleSearchProduct(action) {
  try {
    const { params } = action.payload;
    const { data } = yield call(Api.searchProduct, params);
    yield put({
      type: SEARCH_PRODUCT_SUCCESS,
      payload: { data },

    });
  } catch (e) {
    yield put({
      type: SEARCH_PRODUCT_FAIL,
      message: e.message,
      error: _.get(e, 'response.data'),
    });
  }
}

function* handleGetPopularProducts(action) {
  try {
    yield put(showLoading());

    const { data } = yield call(Api.getPopularProducts);
    yield put({
      type: POPULAR_PRODUCTS_SUCCESS,
      payload: { data },
    });
    yield put(hideLoading());

  } catch (e) {
    yield put({
      type: POPULAR_PRODUCTS_FAIL,
      message: e.message,
      error: _.get(e, 'response.data'),
    });
    yield put(hideLoading());

  }
}

function* handleGetNewProducts() {
  try {
    yield put(showLoading());

    const { data } = yield call(Api.getNewProducts);
    yield put({
      type: NEW_PRODUCTS_SUCCESS,
      payload: { data },
    });
    yield put(hideLoading());

  } catch (e) {
    yield put({
      type: NEW_PRODUCTS_FAIL,
      message: e.message,
      error: _.get(e, 'response.data'),
    });
    yield put(hideLoading());

  }
}
