import {
  GET_ONE_PRODUCT_REQUEST,
  GET_ONE_PRODUCT_SUCCESS,
  GET_ONE_PRODUCT_FAIL,
  RATE_PRODUCTS_FAIL,
  RATE_PRODUCTS_REQUEST,
  RATE_PRODUCTS_SUCCESS,
} from '../actions/getProductById';

const initialState = {
  requestStatus: '',
  error: [],
  productData: [],
loadingBar:''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ONE_PRODUCT_REQUEST: {
      return {
        ...state,
        productData: [],
        requestStatus: 'request',
      };
    }
    case GET_ONE_PRODUCT_SUCCESS: {
      return {
        ...state,
        productData: action.payload.data,
        requestStatus: 'ok',

      };
    }
    case GET_ONE_PRODUCT_FAIL: {
      return {
        ...state, requestStatus: 'fail',
      };
    }

    case RATE_PRODUCTS_REQUEST: {
      return {
        ...state, requestStatus: 'request',
      };
    }
    case RATE_PRODUCTS_SUCCESS: { console.log(action, 55555);
      return {
        ...state,
        requestStatus: 'ok',
        productData: action.payload.data,
      };
    }
    case RATE_PRODUCTS_FAIL: {
      return {
        ...state, requestStatus: 'fail',
      };
    }
    default: {
      return state;
    }
  }
}
