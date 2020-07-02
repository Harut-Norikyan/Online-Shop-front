import {
  GET_USERS_SUCCESS,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL
} from '../actions/users';
import Account from '../../helpers/Account';


const initialState = {
  token: localStorage.getItem('token') || '',
  user: Account.get(),
  requestStatus: '',
  list: [],
  errors: [],
  users: [],
  error:""
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        requestStatus: 'request',
      };
    }
    case UPDATE_USER_SUCCESS: {
      localStorage.removeItem('account');
      const user = action.payload.user.data.updateUser;
      const status = action.payload.user.statusText;
      Account.set(user);
      return {
        ...state,
        requestStatus: 'ok',
        user,
        status,

      };
    }
    case UPDATE_USER_FAIL: {
      return {
        ...state,
        requestStatus: 'fail',
        error: action.errors.email,

      };
    }

    case ADD_USER_SUCCESS: {
      const { users } = action.payload;
      return {
        ...state,
        requestStatus: 'ok',
        users,
      };
    }
    case ADD_USER_FAIL: {
      return {
        ...state,
        requestStatus: 'faillll',
        error: action,

      };
    }



    case DELETE_USER_REQUEST: {
      return {
        ...state,
        requestStatus: 'request',
      };
    }
    case DELETE_USER_SUCCESS: {
      const successDel = action.payload.user.data.status
      console.log(successDel,"successDel")
      return {
        ...state,
        requestStatus: 'ok',
        successDel
      };
    }
    case DELETE_USER_FAIL: {
      const errorFromDeleteUser = action.errors.mess
      console.log(errorFromDeleteUser)
      return {
        ...state,
        requestStatus: 'fail',
        errorFromDeleteUser
      };
    }




    case USER_LOGIN_SUCCESS: {
      // eslint-disable-next-line no-shadow
      const { token, user } = action.payload.data;
      // console.log(action.payload,"login action payload")
      localStorage.setItem('token', token);
      Account.set(user);
      return {
        ...state,
        token,
        user,
      };
    }
    case USER_LOGIN_FAIL: {
      return {
        ...state,
        requestStatus: 'fail',
        error: action.errors.error,
      };
    }
    case GET_USERS_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        requestStatus: 'ok',
        list: data,
      };
    }
    default: {
      return state;
    }
  }
}
