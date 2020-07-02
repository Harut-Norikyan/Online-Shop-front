export const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
export const GET_USERS_SUCCESS = 'GET_USERS_REQUEST_SUCCESS';
export const GET_USERS_FAIL = 'GET_USERS_REQUEST_FAIL';

export function getUsers() {
  return {
    type: GET_USERS_REQUEST,
    payload: {},
  };
}


export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAIL = 'ADD_USER_FAIL';

export function addUser(data) {
  return {
    type: ADD_USER_REQUEST,
    payload: { data },
  };
}


export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';

export function userLoginRequest(email, password) {

  return {
    type: USER_LOGIN_REQUEST,
    payload: {
      email, password,
    },
  };
}

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';

export function updateUser(id,data) {
  return {
    type: UPDATE_USER_REQUEST,
    payload: { id,data },
  };
}
export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAIL = 'DELETE_USER_FAIL';

export function deleteUser(id,password) {
  return {
    type: DELETE_USER_REQUEST,
    payload: { id ,password},
  };
}



