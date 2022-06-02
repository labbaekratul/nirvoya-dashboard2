import Axios from "axios";
import {
  ALL_SUPPORT_TICKETS_FAIL,
  ALL_SUPPORT_TICKETS_REQUEST,
  ALL_SUPPORT_TICKETS_SUCCESS,
  SUPPORT_TICKETS_ADMIN_FAIL,
  SUPPORT_TICKETS_ADMIN_REQUEST,
  SUPPORT_TICKETS_ADMIN_SUCCESS,
  SUPPORT_TICKETS_CREATE_FAIL,
  SUPPORT_TICKETS_CREATE_REQUEST,
  SUPPORT_TICKETS_CREATE_SUCCESS,
  SUPPORT_TICKETS_DELETE_FAIL,
  SUPPORT_TICKETS_DELETE_REQUEST,
  SUPPORT_TICKETS_DELETE_SUCCESS,
  SUPPORT_TICKETS_DETAILS_FAIL,
  SUPPORT_TICKETS_DETAILS_REQUEST,
  SUPPORT_TICKETS_DETAILS_SUCCESS,
  SUPPORT_TICKETS_RECOMMENT_FAIL,
  SUPPORT_TICKETS_RECOMMENT_REQUEST,
  SUPPORT_TICKETS_RECOMMENT_SUCCESS,
  SUPPORT_TICKETS_UPDATE_FAIL,
  SUPPORT_TICKETS_UPDATE_REQUEST,
  SUPPORT_TICKETS_UPDATE_SUCCESS,
} from "../Constants/supportTicketConstants";

// get all support tickets
export const getSupportTickets =
  ({ userId = " " }) =>
  async (dispatch) => {
    dispatch({
      type: ALL_SUPPORT_TICKETS_REQUEST,
    });

    try {
      const { data } = await Axios.get(
        `https://nirvoya.herokuapp.com/api/support?userId=${userId}`
      );
      dispatch({
        type: ALL_SUPPORT_TICKETS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_SUPPORT_TICKETS_FAIL,
        payload: { message: error.message },
      });
    }
  };

// support tickets create
export const createSupportTickets = (support) => async (dispatch) => {
  dispatch({
    type: SUPPORT_TICKETS_CREATE_REQUEST,
    payload: { support },
  });

  const { data } = await Axios.post(
    "https://nirvoya.herokuapp.com/api/support",
    support
  );
  try {
    dispatch({
      type: SUPPORT_TICKETS_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SUPPORT_TICKETS_CREATE_FAIL, payload: message });
  }
};

// support tickets details
export const detailsSupportTickets = (id) => async (dispatch) => {
  dispatch({
    type: SUPPORT_TICKETS_DETAILS_REQUEST,
    payload: id,
  });

  const { data } = await Axios.get(
    `https://nirvoya.herokuapp.com/api/support/${id}`
  );

  try {
    dispatch({
      type: SUPPORT_TICKETS_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUPPORT_TICKETS_DETAILS_FAIL,
      payload: { message: error.message },
    });
  }
};
// support update
export const updateSupportTickets = (sizeData) => async (dispatch) => {
  dispatch({
    type: SUPPORT_TICKETS_UPDATE_REQUEST,
    payload: sizeData,
  });

  const { data } = await Axios.put(
    `https://nirvoya.herokuapp.com/api/support/${sizeData._id}`,
    sizeData
  );

  try {
    dispatch({
      type: SUPPORT_TICKETS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: SUPPORT_TICKETS_UPDATE_FAIL,
      message: message,
    });
  }
};

// support recomment
export const recommentSupportTickets = (comment) => async (dispatch) => {
  dispatch({
    type: SUPPORT_TICKETS_RECOMMENT_REQUEST,
    payload: comment,
  });

  const { data } = await Axios.put(
    `https://nirvoya.herokuapp.com/api/support/${comment.id}/pushComment`,
    comment
  );

  try {
    dispatch({
      type: SUPPORT_TICKETS_RECOMMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: SUPPORT_TICKETS_RECOMMENT_FAIL,
      message: message,
    });
  }
};

//Support Ticket Admin Replay
export const adminSupportTickets = (comment) => async (dispatch) => {
  dispatch({
    type: SUPPORT_TICKETS_ADMIN_REQUEST,
    payload: comment,
  });

  const { data } = await Axios.put(
    `https://nirvoya.herokuapp.com/api/support/comment/${comment.id}`,
    comment
  );

  try {
    dispatch({
      type: SUPPORT_TICKETS_ADMIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: SUPPORT_TICKETS_ADMIN_FAIL,
      message: message,
    });
  }
};

// support delete
export const deleteSupportTickets = (supportId) => async (dispatch) => {
  dispatch({ type: SUPPORT_TICKETS_DELETE_REQUEST, payload: supportId });

  const { data } = await Axios.delete(
    `https://nirvoya.herokuapp.com/api/support/${supportId}`
  );
  try {
    dispatch({
      type: SUPPORT_TICKETS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SUPPORT_TICKETS_DELETE_FAIL, payload: message });
  }
};
