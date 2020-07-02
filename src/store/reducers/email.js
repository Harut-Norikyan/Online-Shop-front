import { SEND_EMAIL_FAIL, SEND_EMAIL_REQUEST, SEND_EMAIL_SUCCESS } from '../actions/email';

const initialState = {
  requestStatus: '',
  error: [],

};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SEND_EMAIL_REQUEST: {console.log(action,22222)
      return {
        ...state, requestStatus: 'request',
      };
    }
    case SEND_EMAIL_SUCCESS: {
      return {
        ...state, requestStatus: 'ok',
      };
    }
    case SEND_EMAIL_FAIL: {
      return {
        ...state, requestStatus: 'fail',
      };
    }
    default: {
      return state;
    }
  }
}
