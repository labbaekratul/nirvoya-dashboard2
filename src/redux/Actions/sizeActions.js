import Axios from "axios";
import {
  ALL_SIZE_FAIL,
  ALL_SIZE_REQUEST,
  ALL_SIZE_SUCCESS,
  SIZE_CREATE_FAIL,
  SIZE_CREATE_REQUEST,
  SIZE_CREATE_SUCCESS,
  SIZE_DELETE_FAIL,
  SIZE_DELETE_REQUEST,
  SIZE_DELETE_SUCCESS,
  SIZE_EDIT_FAIL,
  SIZE_EDIT_REQUEST,
  SIZE_EDIT_SUCCESS,
  SIZE_UPDATE_FAIL,
  SIZE_UPDATE_REQUEST,
  SIZE_UPDATE_SUCCESS,
} from "../Constants/sizeConstants";

// get all sizes
export const getSizes = () => async (dispatch) => {
  dispatch({
    type: ALL_SIZE_REQUEST,
  });

  try {
    const { data } = await Axios.get("https://nirvoya.herokuapp.com/api/size");
    dispatch({
      type: ALL_SIZE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_SIZE_FAIL,
      payload: { message: error.message },
    });
  }
};
// size create
export const createSizes = (size) => async (dispatch) => {
  dispatch({
    type: SIZE_CREATE_REQUEST,
    payload: { size },
  });

  const { data } = await Axios.post(
    "https://nirvoya.herokuapp.com/api/size",
    size
  );
  try {
    dispatch({
      type: SIZE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SIZE_CREATE_FAIL, payload: message });
  }
};
// size edit
export const editSize = (id) => async (dispatch) => {
  dispatch({
    type: SIZE_EDIT_REQUEST,
    payload: id,
  });

  const { data } = await Axios.get(
    `https://nirvoya.herokuapp.com/api/size/${id}`
  );
  try {
    dispatch({
      type: SIZE_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SIZE_EDIT_FAIL,
      payload: { message: error.message },
    });
  }
};
// size update
export const updateSize = (sizeData) => async (dispatch) => {
  dispatch({
    type: SIZE_UPDATE_REQUEST,
    payload: sizeData,
  });

  const { data } = await Axios.put(
    `https://nirvoya.herokuapp.com/api/size/${sizeData._id}`,
    sizeData
  );

  try {
    dispatch({
      type: SIZE_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: SIZE_UPDATE_FAIL,
      message: message,
    });
  }
};
// size delete
export const deleteSize = (sizeId) => async (dispatch) => {
  dispatch({ type: SIZE_DELETE_REQUEST, payload: sizeId });

  const { data } = await Axios.delete(
    `https://nirvoya.herokuapp.com/api/size/${sizeId}`
  );
  try {
    dispatch({
      type: SIZE_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SIZE_DELETE_FAIL, payload: message });
  }
};
