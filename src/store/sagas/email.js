import { takeLatest, put, call } from 'redux-saga/effects';
import _ from 'lodash';
// eslint-disable-next-line import/no-named-as-default
import Api from '../../Api';
import { SEND_EMAIL_FAIL, SEND_EMAIL_REQUEST, SEND_EMAIL_SUCCESS } from '../actions/email';

export default function* watcher() {
  yield takeLatest(SEND_EMAIL_REQUEST, handleSendEmail);
}
function* handleSendEmail(action) {
  try {
    const { email } = action.payload;
    const { data } = yield call(Api.sendEmail,email);
    yield put({
      type: SEND_EMAIL_SUCCESS,
      payload: { data },
    });
  } catch (e) {
    yield put({
      type: SEND_EMAIL_FAIL,
      message: e.message,
      error: _.get(e, 'response.data'),
    })}}
