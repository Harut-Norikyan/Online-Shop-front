import { takeLatest, put, call } from 'redux-saga/effects';
import { Api } from '../../Api';
import {
  GET_USERS_REQUEST,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL
} from '../actions/users';
import {hideLoading,showLoading} from "react-redux-loading-bar";


export default function* watcher() {
  yield takeLatest(GET_USERS_REQUEST, getList);
  yield takeLatest(ADD_USER_REQUEST, addUser);
  yield takeLatest(USER_LOGIN_REQUEST, handleCheck);
  yield takeLatest(UPDATE_USER_REQUEST, handleUpdateUser);
  yield takeLatest(DELETE_USER_REQUEST, handleDeleteUser);
}
function* handleUpdateUser(action) {
  try {
    const { id, data } = action.payload;
    yield put(showLoading());

    const user = yield call(Api.updateDataUser, id, data);
    yield put({
      type: UPDATE_USER_SUCCESS,
      payload: { user },
    });
    yield put(hideLoading());

  } catch (e) {
    yield put({
      type: UPDATE_USER_FAIL,
      message: e.message,
      errors: e.response.data.errors,
    });
    yield put(hideLoading());
  }
}

function* handleDeleteUser(action) {
  try {
    const { id,password } = action.payload;
    yield put(showLoading());
    const user = yield call(Api.deleteDataUser, id,password);
    yield put({
      type: DELETE_USER_SUCCESS,
      payload: { user },
    });
    yield put(hideLoading());

  } catch (e) {
    yield put({
      type: DELETE_USER_FAIL,
      message: e.message,
      errors: e.response.data.errors,
    });
    yield put(hideLoading());
  }
}


function* handleCheck(action) {
  try {
    const { email, password } = action.payload;
    yield put(showLoading());

    const { data } = yield call(Api.login, email, password);
    yield put({
      type: USER_LOGIN_SUCCESS,
      payload: { data },
    });
    yield put(hideLoading());

  } catch (e) {
    yield put({
      type: USER_LOGIN_FAIL,
      message: e.message,
      errors: e.response.data.errors,
    });
    yield put(hideLoading());

  }
}

function* addUser(action) {
  try {
    const { data } = action.payload;
    yield put(showLoading());
    const { users } = yield call(Api.addUser, data);


    yield put({
      type: ADD_USER_SUCCESS,
      payload: { users },
    });
    yield put(hideLoading());

  } catch (e) {
    yield put({
      type: ADD_USER_FAIL,
      message: e.message,
      errors: e.response.data.errors,
    });
    yield put(hideLoading());

  }
}


function* getList() {
  try {
    const { data } = yield call(Api.getUsers);
    yield put({
      type: GET_USERS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    yield put({
      type: GET_USERS_FAIL,
      payload: e.response.message,
    });
  }
}
