export const GET_CATEGORY_REQUEST = 'GET_CATEGORY_REQUEST';
export const GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS';
export const GET_CATEGORY_FAIL = 'GET_CATEGORY_FAIL';

export function getCategoryRequest() {
  return {
    type: GET_CATEGORY_REQUEST,
    payload: {},
  };
}
