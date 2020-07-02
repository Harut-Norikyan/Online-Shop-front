import { takeLatest, put, call } from 'redux-saga/effects';
import _ from 'lodash';
// eslint-disable-next-line import/no-named-as-default
import Api from '../../Api';
import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  GET_SINGLE_POST_REQUEST,
  GET_SINGLE_POST_SUCCESS,
  GET_SINGLE_POST_FAIL,
} from '../actions/posts';
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export default function* watcher() {
  yield takeLatest(GET_SINGLE_POST_REQUEST, handleGetOnePost);
  yield takeLatest(GET_POSTS_REQUEST, handleGetPosts);
}
function* handleGetOnePost(action) {
  try {
    yield put(showLoading());

    const { id } = action.payload;
    const { data } = yield call(Api.getPost, id);

    yield put({
      type: GET_SINGLE_POST_SUCCESS,
      payload: { data },
    });
    yield put(hideLoading());

  } catch (e) {
    yield put({
      type: GET_SINGLE_POST_FAIL,
      message: e.message,
      error: _.get(e, 'response.data'),
    });
  }
}
function* handleGetPosts(action) {
  try {
    yield put(showLoading());
    const { data } = yield call(Api.getList);
    yield put({
      type: GET_POSTS_SUCCESS,
      payload: { data },

    });
    yield put(hideLoading());

  } catch (e) {
    yield put({
      type: GET_POSTS_FAIL,
      message: e.message,
      error: _.get(e, 'response.data'),
    });
    yield put(hideLoading());

  }
}
