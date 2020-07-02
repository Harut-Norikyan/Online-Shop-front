import { takeLatest, put, call } from 'redux-saga/effects';
import _ from 'lodash';
// eslint-disable-next-line import/no-named-as-default
import Api from '../../Api';
import { GET_CATEGORY_FAIL, GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS } from '../actions/category';
import {showLoading,hideLoading} from "react-redux-loading-bar";

export default function* watcher() {
  yield takeLatest(GET_CATEGORY_REQUEST, handleGetCategory);
}
function* handleGetCategory() {
  try {

    const { data } = yield call(Api.getCategory);
    yield put({
      type: GET_CATEGORY_SUCCESS,
      payload: { data },
    });

  } catch (e) {

    yield put({
      type: GET_CATEGORY_FAIL,
      message: e.message,
      error: _.get(e, 'response.data'),
    });
  }
}
