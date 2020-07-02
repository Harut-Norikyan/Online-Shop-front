import {
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS, NEW_PRODUCTS_FAIL,
  NEW_PRODUCTS_REQUEST,

  NEW_PRODUCTS_SUCCESS,
  POPULAR_PRODUCTS_FAIL,
  POPULAR_PRODUCTS_REQUEST,
  POPULAR_PRODUCTS_SUCCESS,

  SEARCH_PRODUCT_FAIL,
  SEARCH_PRODUCT_REQUEST,
  SEARCH_PRODUCT_SUCCESS,
} from '../actions/getProducts';

const initialState = {
  requestStatus: '',
  error: [],
  productsList: [],
  productsCount: '',
  searchedProducts: [],
  popularProducts: [],

};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST: {
      return {
        ...state, requestStatus: 'request',
      };
    }
    case GET_PRODUCTS_SUCCESS: {
      const { data } = action.payload;
      const productsList = data.products;
      return {
        ...state,
        productsList,
        productsCount: data,
        requestStatus: 'ok',
      };
    }
    case GET_PRODUCTS_FAIL: {
      return {
        ...state, requestStatus: 'fail',
      };
    }


    case NEW_PRODUCTS_REQUEST: {

      return {
        ...state, requestStatus: 'request',
      };
    }

    case NEW_PRODUCTS_SUCCESS: {
      const { data } = action.payload;
      const { products } = action.payload.data;
      const productsList = products;
      return {
        ...state, productsList, productsCount: data, requestStatus: 'ok',
      };
    }
    case NEW_PRODUCTS_FAIL: {

      return {
        ...state, requestStatus: 'fail',
      };
    }
    case SEARCH_PRODUCT_REQUEST: {
      return {
        ...state, requestStatus: 'request',
      };
    }
    case SEARCH_PRODUCT_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        searchedProducts: data.products,
        requestStatus: 'ok',
      };
    }
    case SEARCH_PRODUCT_FAIL: {
      return {
        ...state, requestStatus: 'fail',
      };
    }

    case POPULAR_PRODUCTS_REQUEST: {
      return {
        ...state, requestStatus: 'request',
      };
    }
    case POPULAR_PRODUCTS_SUCCESS: {
      const { data } = action.payload;
      const popularProducts = data.products;
      return {
        ...state,
        popularProducts,
        requestStatus: 'ok',
      };
    }
    case POPULAR_PRODUCTS_FAIL: {
      return {
        ...state, requestStatus: 'fail',
      };
    }

    default: {
      return state;
    }

  }
}
