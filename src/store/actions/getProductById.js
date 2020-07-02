export const GET_ONE_PRODUCT_REQUEST = 'GET_ONE_PRODUCT_REQUEST';
export const GET_ONE_PRODUCT_SUCCESS = 'GET_ONE_PRODUCT_SUCCESS';
export const GET_ONE_PRODUCT_FAIL = 'GET_ONE_PRODUCT_FAIL';

export function getProductByIdRequest(id) {
  return {
    type: GET_ONE_PRODUCT_REQUEST,
    payload: { id },
  };
}

export const RATE_PRODUCTS_REQUEST = 'RATE_PRODUCTS_REQUEST';
export const RATE_PRODUCTS_SUCCESS = 'RATE_PRODUCTS_SUCCESS';
export const RATE_PRODUCTS_FAIL = 'RATE_PRODUCTS_FAIL';

export function rateProductsRequest(rating,id) {
  return {
    type: RATE_PRODUCTS_REQUEST,
    payload: {rating,id},
  };
}