import Axios from "axios";
import {
  ADD_COLOR_FAIL,
  ADD_COLOR_REQUEST,
  ADD_COLOR_SUCCESS,
  COLOR_CREATE_FAIL,
  COLOR_CREATE_REQUEST,
  COLOR_CREATE_SUCCESS,
  COLOR_DELETE_FAIL,
  COLOR_DELETE_REQUEST,
  COLOR_DELETE_SUCCESS,
  COLOR_DETAILS_FAIL,
  COLOR_DETAILS_REQUEST,
  COLOR_DETAILS_SUCCESS,
  COLOR_UPDATE_FAIL,
  COLOR_UPDATE_REQUEST,
  COLOR_UPDATE_SUCCESS,
} from "../Constants/colorConstants";

//Get all color
export const addColors = () => async (dispatch) => {
  dispatch({
    type: ADD_COLOR_REQUEST,
  });

  try {
    const { data } = await Axios.get("https://nirvoya.herokuapp.com/api/color");

    dispatch({
      type: ADD_COLOR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_COLOR_FAIL,
      payload: { message: error.message },
    });
  }
};
// Single Color Action details

export const colorDetail = (id) => async (dispatch) => {
  dispatch({
    type: COLOR_DETAILS_REQUEST,
    payload: id,
  });

  try {
    const { data } = await Axios.get(
      `https://nirvoya.herokuapp.com/api/color/${id}`
    );
    dispatch({
      type: COLOR_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COLOR_DETAILS_FAIL,
      payload: { message: error.message },
    });
  }
};

//Create Color Action

export const createColor = (color) => async (dispatch) => {
  dispatch({
    type: COLOR_CREATE_REQUEST,
    payload: { color },
  });

  try {
    const { data } = await Axios.post(
      "https://nirvoya.herokuapp.com/api/color",
      color
    );
    dispatch({
      type: COLOR_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: COLOR_CREATE_FAIL, payload: message });
  }
};

//Update Color Action

export const updateColor = (color) => async (dispatch) => {
  dispatch({ type: COLOR_UPDATE_REQUEST, payload: color });

  try {
    const { data } = await Axios.put(
      `https://nirvoya.herokuapp.com/api/color/${color._id}`,
      color,
      {}
    );
    dispatch({ type: COLOR_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: COLOR_UPDATE_FAIL, error: message });
  }
};

//Color Delete Action

export const deleteColor = (colorId) => async (dispatch) => {
  dispatch({ type: COLOR_DELETE_REQUEST, payload: colorId });

  try {
    Axios.delete(`https://nirvoya.herokuapp.com/api/color/${colorId}`, {});
    dispatch({ type: COLOR_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: COLOR_DELETE_FAIL, payload: message });
  }
};
