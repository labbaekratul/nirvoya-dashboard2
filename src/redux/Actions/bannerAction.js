import Axios from "axios";
import {
  ALL_BANNER_FAIL,
  ALL_BANNER_REQUEST,
  ALL_BANNER_SUCCESS,
  BANNER_CREATE_FAIL,
  BANNER_CREATE_REQUEST,
  BANNER_CREATE_SUCCESS,
  BANNER_DELETE_FAIL,
  BANNER_DELETE_REQUEST,
  BANNER_DELETE_SUCCESS,
  BANNER_DETAILS_FAIL,
  BANNER_DETAILS_REQUEST,
  BANNER_DETAILS_SUCCESS,
  BANNER_UPDATE_FAIL,
  BANNER_UPDATE_REQUEST,
  BANNER_UPDATE_SUCCESS,
} from "../Constants/bannerConstant";

// Get all banner
export const GetBanners = () => async (dispatch) => {
  dispatch({
    type: ALL_BANNER_REQUEST,
  });

  try {
    const { data } = await Axios.get(
      "https://nirvoya.herokuapp.com/api/banner"
    );

    dispatch({
      type: ALL_BANNER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_BANNER_FAIL,
      payload: { message: error.message },
    });
  }
};

// banner Action details
export const bannerDetail = (id) => async (dispatch) => {
  dispatch({
    type: BANNER_DETAILS_REQUEST,
    payload: id,
  });

  try {
    const { data } = await Axios.get(
      `https://nirvoya.herokuapp.com/api/banner/${id}`
    );
    dispatch({
      type: BANNER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BANNER_DETAILS_FAIL,
      payload: { message: error.message },
    });
  }
};

// Create banner Action
export const createBanner = (banner) => async (dispatch) => {
  dispatch({
    type: BANNER_CREATE_REQUEST,
    payload: { banner },
  });

  try {
    const { data } = await Axios.post(
      "https://nirvoya.herokuapp.com/api/banner",
      banner
    );
    dispatch({
      type: BANNER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BANNER_CREATE_FAIL, payload: message });
  }
};

// Update banner Action
export const updateBanner = (banner) => async (dispatch) => {
  dispatch({ type: BANNER_UPDATE_REQUEST, payload: banner });

  try {
    const { data } = await Axios.put(
      `https://nirvoya.herokuapp.com/api/banner/${banner._id}`,
      banner,
      {}
    );
    dispatch({ type: BANNER_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BANNER_UPDATE_FAIL, error: message });
  }
};

// banner Delete Action
export const deleteBanner = (bannerId) => async (dispatch) => {
  dispatch({ type: BANNER_DELETE_REQUEST, payload: bannerId });

  try {
    Axios.delete(`https://nirvoya.herokuapp.com/api/banner/${bannerId}`, {});
    dispatch({ type: BANNER_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: BANNER_DELETE_FAIL, payload: message });
  }
};
