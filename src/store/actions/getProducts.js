export const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAIL = 'GET_PRODUCTS_FAIL';

export function getProductsRequest(page, params) {
  return {
    type: GET_PRODUCTS_REQUEST,
    payload: { page, params },
  };
}

export const SEARCH_PRODUCT_REQUEST = 'SEARCH_PRODUCT_REQUEST';
export const SEARCH_PRODUCT_SUCCESS = 'SEARCH_PRODUCT_SUCCESS';
export const SEARCH_PRODUCT_FAIL = 'SEARCH_PRODUCT_FAIL';

export function searchProductRequest(params) {
  return {
    type: SEARCH_PRODUCT_REQUEST,
    payload: { params },
  };
}
export const NEW_PRODUCTS_REQUEST = 'NEW_PRODUCTS_REQUEST';
export const NEW_PRODUCTS_SUCCESS = 'NEW_PRODUCTS_SUCCESS';
export const NEW_PRODUCTS_FAIL = 'NEW_PRODUCTS_FAIL';

export function newProductsRequest() {
  return {
    type: NEW_PRODUCTS_REQUEST,
    payload: {},
  };
}

export const POPULAR_PRODUCTS_REQUEST = 'POPULAR_PRODUCTS_REQUEST';
export const POPULAR_PRODUCTS_SUCCESS = 'POPULAR_PRODUCTS_SUCCESS';
export const POPULAR_PRODUCTS_FAIL = 'POPULAR_PRODUCTS_FAIL';

export function getPopularProductsRequest() {
  return {
    type: POPULAR_PRODUCTS_REQUEST,
    payload: {},
  };
}
