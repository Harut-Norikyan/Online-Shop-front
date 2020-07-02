import {
  SEND_PRODUCTS_REQUEST,
  SEND_PRODUCTS_SUCCESS,
  SEND_PRODUCT_FAIL,
  GET_PRODUCTS_ORDERS_REQUEST,
  GET_PRODUCTS_ORDERS_SUCCESS,
  GET_PRODUCT_ORDERS_FAIL,
  DELETE_PRODUCTS_REQUEST,
  DELETE_PRODUCTS_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  PAYMENT_ORDER_REQUEST,
  PAYMENT_ORDER_SUCCESS,
  PAYMENT_ORDER_FAIL,
  PAYMENT_PAYED_REQUEST,
  PAYMENT_PAYED_SUCCESS,
  PAYMENT_PAYED_FAIL,
  SEND_TO_PAYMENT_REQUEST,
  SEND_TO_PAYMENT_SUCCESS,
  SEND_TO_PAYMENT_FAIL,

} from '../actions/orders';
// import orders from "../sagas/orders";

const initialState = {
  requestStatus: '',
  order: [],
  clientSecret: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SEND_PRODUCTS_REQUEST: {
      return {
        ...state, requestStatus: 'request',
      };
    }
    case SEND_PRODUCTS_SUCCESS: {
      return {
        ...state,
        requestStatus: 'ok',
      };
    }
    case SEND_PRODUCT_FAIL: {
      return {
        ...state, requestStatus: 'fail',
      };
    }
    case GET_PRODUCTS_ORDERS_REQUEST: {
      return {
        ...state, requestStatus: 'request',
      };
    }
    case GET_PRODUCTS_ORDERS_SUCCESS: {
      const { orders } = action.payload.orders.data;
      const order = [...orders];

      return {
        ...state,
        requestStatus: 'ok',
        order,
      };
    }
    case GET_PRODUCT_ORDERS_FAIL: {
      return {
        ...state, requestStatus: 'fail',
      };
    }

    case DELETE_PRODUCTS_REQUEST: {
      return {
        ...state, requestStatus: 'request',
      };
    }
    case DELETE_PRODUCTS_SUCCESS: {
      const status = action.payload.statusOrder.statusText;
      const { orderId } = action.payload;
      const order = state.order.filter((o) => o.orderId !== orderId);
      return {
        ...state,
        requestStatus: 'ok',
        status,
        order,
      };
    }
    case DELETE_PRODUCT_FAIL: {
      return {
        ...state, requestStatus: 'fail',
      };
    }

    case UPDATE_ORDER_REQUEST: {
      return {
        ...state, requestStatus: 'request',
      };
    }
    case UPDATE_ORDER_SUCCESS: {
      return {
        ...state,
        requestStatus: 'ok',
      };
    }
    case UPDATE_ORDER_FAIL: {
      return {
        ...state, requestStatus: 'fail',
      };
    }
    case PAYMENT_ORDER_REQUEST: {
      return {
        ...state, requestStatus: 'request',
      };
    }
    case PAYMENT_ORDER_SUCCESS: {
      const { clientSecret } = action.payload.data.data;
      return {
        ...state,
        requestStatus: 'ok',
        clientSecret,
      };
    }
    case PAYMENT_ORDER_FAIL: {
      return {
        ...state, requestStatus: 'fail',
      };
    }

    case PAYMENT_PAYED_REQUEST: {
      return {
        ...state,
        requestStatus: 'request',
      };
    }
    case PAYMENT_PAYED_SUCCESS: {
      const status = action.payload.payed.statusText;
      return {
        ...state,
        requestStatus: 'ok',
        status,
      };
    }
    case PAYMENT_PAYED_FAIL: {
      return {
        ...state, requestStatus: 'fail',
      };
    }

    case SEND_TO_PAYMENT_REQUEST: {
      return {
        ...state,
        requestStatus: 'request',
      };
    }
    case SEND_TO_PAYMENT_SUCCESS: {
      return {
        ...state,
        requestStatus: 'ok',
      };
    }
    case SEND_TO_PAYMENT_FAIL: {
      return {
        ...state, requestStatus: 'fail',
      };
    }

    default: {
      return state;
    }
  }
}
