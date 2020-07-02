export const SEND_PRODUCTS_REQUEST = 'SEND_PRODUCT_REQUEST';
export const SEND_PRODUCTS_SUCCESS = 'SEND_PRODUCT_SUCCESS';
export const SEND_PRODUCT_FAIL = 'SEND_PRODUCT_FAIL';
export function sendProductRequest(data) {
  return {
    type: SEND_PRODUCTS_REQUEST,
    payload: { data },
  };
}

export const GET_PRODUCTS_ORDERS_REQUEST = 'GET_PRODUCTS_ORDERS_REQUEST';
export const GET_PRODUCTS_ORDERS_SUCCESS = 'GET_PRODUCTS_ORDERS_SUCCESS';
export const GET_PRODUCT_ORDERS_FAIL = 'GET_PRODUCT_ORDERS_FAIL';
export function getProductFromOrders() {
  return {
    type: GET_PRODUCTS_ORDERS_REQUEST,
    payload: {},
  };
}

export const DELETE_PRODUCTS_REQUEST = 'DELETE_PRODUCTS_REQUEST';
export const DELETE_PRODUCTS_SUCCESS = 'DELETE_PRODUCTS_SUCCESS';
export const DELETE_PRODUCT_FAIL = 'DELETE_PRODUCT_FAIL';
export function deleteOrder(orderId) {
  return {
    type: DELETE_PRODUCTS_REQUEST,
    payload: { orderId },
  };
}

export const UPDATE_ORDER_REQUEST = 'UPDATE_ORDER_REQUEST';
export const UPDATE_ORDER_SUCCESS = 'UPDATE_ORDER_SUCCESS';
export const UPDATE_ORDER_FAIL = 'UPDATE_ORDER_FAIL';
export function updateOrder(orderId,data) {
  return {
    type: UPDATE_ORDER_REQUEST,
    payload: { orderId,data },
  };
}

export const PAYMENT_ORDER_REQUEST = 'PAYMENT_ORDER_REQUEST';
export const PAYMENT_ORDER_SUCCESS = 'PAYMENT_ORDER_SUCCESS';
export const PAYMENT_ORDER_FAIL = 'PAYMENT_ORDER_FAIL';
export function paymentResultRequest(total,items) {

  return {
    type: PAYMENT_ORDER_REQUEST,
    payload: { total,items },
  };
}


export const PAYMENT_PAYED_REQUEST = 'PAYMENT_PAYED_REQUEST';
export const PAYMENT_PAYED_SUCCESS = 'PAYMENT_PAYED_SUCCESS';
export const PAYMENT_PAYED_FAIL = 'PAYMENT_PAYED_FAIL';
export function paymentPayedRequest() {

  return {
    type: PAYMENT_PAYED_REQUEST,
    payload: { },
  };
}
export const SEND_TO_PAYMENT_REQUEST = 'SEND_TO_PAYMENT_REQUEST';
export const SEND_TO_PAYMENT_SUCCESS = 'SEND_TO_PAYMENT_SUCCESS';
export const SEND_TO_PAYMENT_FAIL = 'SEND_TO_PAYMENT_FAIL';

export function sendToPayment(data) {
  return {
    type: SEND_TO_PAYMENT_REQUEST,
    payload: { data },
  };
}

