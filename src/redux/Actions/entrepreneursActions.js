import Axios from "axios";
import {
  ALL_ENTREPRENEURS_FAIL,
  ALL_ENTREPRENEURS_REQUEST,
  ALL_ENTREPRENEURS_SUCCESS,
  ENTREPRENEURS_CREATE_FAIL,
  ENTREPRENEURS_CREATE_REQUEST,
  ENTREPRENEURS_CREATE_SUCCESS,
  ENTREPRENEURS_DELETE_FAIL,
  ENTREPRENEURS_DELETE_REQUEST,
  ENTREPRENEURS_DELETE_SUCCESS,
  ENTREPRENEURS_EDIT_FAIL,
  ENTREPRENEURS_EDIT_REQUEST,
  ENTREPRENEURS_EDIT_SUCCESS,
  ENTREPRENEURS_UPDATE_FAIL,
  ENTREPRENEURS_UPDATE_REQUEST,
  ENTREPRENEURS_UPDATE_SUCCESS,
} from "../Constants/entrepreneursConstants";

// get all entrepreneurs
export const getEntrepreneurs =
  ({ pageNumber = 1, pageSize }) =>
  async (dispatch) => {
    dispatch({
      type: ALL_ENTREPRENEURS_REQUEST,
    });

    const { data } = await Axios.get(
      `https://nirvoya.herokuapp.com/api/entrepreneur?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    try {
      dispatch({
        type: ALL_ENTREPRENEURS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_ENTREPRENEURS_FAIL,
        payload: { message: error.message },
      });
    }
  };

// entrepreneurs create
export const createEntrepreneurs = (entrepreneurs) => async (dispatch) => {
  dispatch({
    type: ENTREPRENEURS_CREATE_REQUEST,
    payload: entrepreneurs,
  });

  try {
    const { data } = await Axios.post(
      "https://nirvoya.herokuapp.com/api/entrepreneur",
      entrepreneurs
    );
    dispatch({
      type: ENTREPRENEURS_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ENTREPRENEURS_CREATE_FAIL,
      payload: message,
    });
  }
};

// entrepreneurs edit
export const editEntrepreneurs = (id) => async (dispatch) => {
  dispatch({
    type: ENTREPRENEURS_EDIT_REQUEST,
    payload: id,
  });

  try {
    const { data } = await Axios.get(
      `https://nirvoya.herokuapp.com/api/entrepreneur/${id}`
    );
    dispatch({
      type: ENTREPRENEURS_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ENTREPRENEURS_EDIT_FAIL,
      payload: { message: error.message },
    });
  }
};

// entrepreneurs update
export const updateEntrepreneurs = (entrepreneursData) => async (dispatch) => {
  dispatch({
    type: ENTREPRENEURS_UPDATE_REQUEST,
    payload: entrepreneursData,
  });

  try {
    const { data } = await Axios.put(
      `https://nirvoya.herokuapp.com/api/entrepreneur/${entrepreneursData._id}`,
      entrepreneursData
    );
    dispatch({
      type: ENTREPRENEURS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ENTREPRENEURS_UPDATE_FAIL,
      payload: message,
    });
  }
};

// entrepreneurs delete
export const deleteEntrepreneurs = (entrepreneurId) => async (dispatch) => {
  dispatch({ type: ENTREPRENEURS_DELETE_REQUEST, payload: entrepreneurId });

  try {
    await Axios.delete(
      `https://nirvoya.herokuapp.com/api/entrepreneur/${entrepreneurId}`,
      {}
    );
    dispatch({
      type: ENTREPRENEURS_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ENTREPRENEURS_DELETE_FAIL, payload: message });
  }
};
