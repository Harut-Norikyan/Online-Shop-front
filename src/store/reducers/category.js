import { GET_CATEGORY_FAIL, GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS } from '../actions/category';

const initialState = {
  requestStatus: '',
  error: [],
  categories: [],

};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY_REQUEST: {
      return {
        ...state, requestStatus: 'request',
      };
    }

    case GET_CATEGORY_SUCCESS: {

      const { data } = action.payload;
      return {
        ...state, categories: data, requestStatus: 'ok',
      };
    }
    case GET_CATEGORY_FAIL: {
      return {
        ...state, requestStatus: 'fail',
      };
    }
    default: {
      return state;
    }
  }
}
