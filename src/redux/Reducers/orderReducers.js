import {
  ALL_ORDER_FAIL,
  ALL_ORDER_REQUEST,
  ALL_ORDER_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_RESET,
  ORDER_DELETE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_UPDATE_FAIL,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_RESET,
  ORDER_UPDATE_SUCCESS,
  USER_ORDER_LIST_FAIL,
  USER_ORDER_LIST_REQUEST,
  USER_ORDER_LIST_SUCCESS,
} from "../Constants/orderConstants";

// GET ALL ORDER REDUCERS
export const ordersReducers = (
  state = { loading: true, orders: [] },
  action
) => {
  switch (action.type) {
    case ALL_ORDER_REQUEST:
      return { loading: true };

    case ALL_ORDER_SUCCESS:
      return { loading: false, success: true, orders: action.payload };

    case ALL_ORDER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
// create order reducers
export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, orderCreate: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
// order details reducers
export const orderDetailsReducer = (
  state = { loading: true, orderDetails: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loadding: true };

    case ORDER_DETAILS_SUCCESS:
      return { loadding: false, success: true, orderDetails: action.payload };

    case ORDER_DETAILS_FAIL:
      return { loadding: false, error: action.payload };

    default:
      return state;
  }
};
// order update reducers
export const orderUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_UPDATE_REQUEST:
      return { loading: true };
    case ORDER_UPDATE_SUCCESS:
      return { loading: false, success: true, orderUpdate: action.payload };
    case ORDER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
// order delete reducers
export const orderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      return { loading: true };
    case ORDER_DELETE_SUCCESS:
      return { loading: false, success: true, orderDelete: action.payload };
    case ORDER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
// order details reducers
export const userOrdersReducer = (
  state = { loading: true, userOrders: [] },
  action
) => {
  switch (action.type) {
    case USER_ORDER_LIST_REQUEST:
      return { loadding: true };

    case USER_ORDER_LIST_SUCCESS:
      return { loadding: false, success: true, userOrders: action.payload };

    case USER_ORDER_LIST_FAIL:
      return { loadding: false, error: action.payload };

    default:
      return state;
  }
};
