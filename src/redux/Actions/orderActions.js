import Axios from "axios";
import {
  ALL_ORDER_FAIL,
  ALL_ORDER_REQUEST,
  ALL_ORDER_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_UPDATE_FAIL,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
} from "../Constants/orderConstants";

// get all orders
export const getOrders =
  ({ user = "", pageNumber = "", orderId = "" }) =>
  async (dispatch) => {
    dispatch({
      type: ALL_ORDER_REQUEST,
    });

    try {
      const { data } = await Axios.get(
        `https://nirvoya.herokuapp.com/api/orders?user=${user}&pageNumber=${pageNumber}&orderId=${orderId}`
      );
      dispatch({
        type: ALL_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_ORDER_FAIL,
        payload: { message: error.message },
      });
    }
  };
// order create
export const createOrder = (order) => async (dispatch) => {
  dispatch({
    type: ORDER_CREATE_REQUEST,
    payload: { order },
  });

  const { data } = await Axios.post(
    "https://nirvoya.herokuapp.com/api/orders",
    order
  );
  try {
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_CREATE_FAIL, payload: message });
  }
};
// order details
export const detailsOrder = (id) => async (dispatch) => {
  dispatch({
    type: ORDER_DETAILS_REQUEST,
    payload: id,
  });

  const { data } = await Axios.get(
    `https://nirvoya.herokuapp.com/api/orders/${id}`
  );
  try {
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: { message: error.message },
    });
  }
};

// order update
export const updateOrder = (orderData) => async (dispatch) => {
  dispatch({
    type: ORDER_UPDATE_REQUEST,
    payload: orderData,
  });

  const { data } = await Axios.put(
    `https://nirvoya.herokuapp.com/api/orders/${orderData._id}`,
    orderData
  );

  try {
    dispatch({
      type: ORDER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_UPDATE_FAIL,
      message: message,
    });
  }
};
// order delete
export const deleteOrder = (orderId) => async (dispatch) => {
  dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });

  const { data } = await Axios.delete(
    `https://nirvoya.herokuapp.com/api/orders/${orderId}`
  );
  try {
    dispatch({
      type: ORDER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DELETE_FAIL, payload: message });
  }
};
