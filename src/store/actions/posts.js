export const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAIL = 'GET_POSTS_FAIL';

export function getPostsRequest() {
  return {
    type: GET_POSTS_REQUEST,
    payload: { },
  };
}
export const GET_SINGLE_POST_REQUEST = 'GET_SINGLE_POST_REQUEST';
export const GET_SINGLE_POST_SUCCESS = 'GET_SINGLE_POST_SUCCESS';
export const GET_SINGLE_POST_FAIL = 'GET_SINGLE_POST_FAIL';

export function getSinglePostRequest(id) {
  return {
    type: GET_SINGLE_POST_REQUEST,
    payload: {id },
  };
}