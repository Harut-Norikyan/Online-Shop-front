import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,

  GET_SINGLE_POST_REQUEST,
  GET_SINGLE_POST_SUCCESS,
  GET_SINGLE_POST_FAIL,
} from '../actions/posts';

const initialState = {
  requestStatus: '',
  error: [],
  postData: [],
  loadingBar: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS_REQUEST: {
      return {
        ...state, requestStatus: 'request',
      };
    }
    case GET_POSTS_SUCCESS: {
      const { data } = action.payload;
      const postsData = data.list;
      return {
        ...state,
        postsData,
        requestStatus: 'ok',
      };
    }
    case GET_POSTS_FAIL: {
      return {
        ...state, requestStatus: 'fail',
      };
    }
    case GET_SINGLE_POST_REQUEST: {
      return {
        ...state,
        postData: [],
        requestStatus: 'request',
      };
    }
    case GET_SINGLE_POST_SUCCESS: {
      return {
        ...state,
        postData: action.payload.data,
        requestStatus: 'ok',

      };
    }
    case GET_SINGLE_POST_FAIL: {
      return {
        ...state, requestStatus: 'fail',
      };
    }
    default: {
      return state;
    }
  }
}
