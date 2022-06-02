import Axios from "axios";
import {
  ADMIN_CREATE_FAIL,
  ADMIN_CREATE_REQUEST,
  ADMIN_CREATE_SUCCESS,
  ADMIN_DELETE_FAIL,
  ADMIN_DELETE_REQUEST,
  ADMIN_DELETE_SUCCESS,
  ADMIN_DETAILS_FAIL,
  ADMIN_DETAILS_REQUEST,
  ADMIN_DETAILS_SUCCESS,
  ADMIN_SIGNIN_FAIL,
  ADMIN_SIGNIN_REQUEST,
  ADMIN_SIGNIN_SUCCESS,
  ADMIN_SIGNOUT,
  ADMIN_UPDATE_FAIL,
  ADMIN_UPDATE_REQUEST,
  ADMIN_UPDATE_SUCCESS,
  ALL_ADMIN_FAIL,
  ALL_ADMIN_REQUEST,
  ALL_ADMIN_SUCCESS,
} from "../Constants/adminConstant";

// get all admin list
export const getAdmins = () => async (dispatch) => {
  dispatch({
    type: ALL_ADMIN_REQUEST,
  });

  try {
    const { data } = await Axios.get(
      "https://nirvoya.herokuapp.com/api/admin/"
    );
    dispatch({
      type: ALL_ADMIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ADMIN_FAIL,
      payload: { message: error.message },
    });
  }
};

// admin create
export const createAdmin = (admin) => async (dispatch) => {
  dispatch({
    type: ADMIN_CREATE_REQUEST,
    payload: admin,
  });

  try {
    const { data } = await Axios.post(
      "https://nirvoya.herokuapp.com/api/admin/",
      admin
    );
    dispatch({
      type: ADMIN_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ADMIN_CREATE_FAIL,
      payload: message,
    });
  }
};

// admin details
export const detailsAdmin = (id) => async (dispatch, getState) => {
  dispatch({
    type: ADMIN_DETAILS_REQUEST,
    payload: id,
  });

  const {
    adminSignin: { adminInfo },
  } = getState();

  try {
    const { data } = await Axios.get(
      `https://nirvoya.herokuapp.com/api/admin/${id}`,
      {
        headers: { Authorization: `Bearer ${adminInfo?.token}` },
      }
    );
    dispatch({
      type: ADMIN_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DETAILS_FAIL,
      payload: { message: error.message },
    });
  }
};

// admin update
export const updateAdmin = (adminData) => async (dispatch) => {
  dispatch({
    type: ADMIN_UPDATE_REQUEST,
    payload: adminData,
  });
  try {
    const { data } = await Axios.put(
      `https://nirvoya.herokuapp.com/api/admin/${adminData._id}`,
      adminData
    );
    dispatch({
      type: ADMIN_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ADMIN_UPDATE_FAIL,
      payload: { message: message },
    });
  }
};

// admin delete
export const deleteAdmin = (adminId) => async (dispatch) => {
  dispatch({
    type: ADMIN_DELETE_REQUEST,
    payload: adminId,
  });

  try {
    const { data } = await Axios.delete(
      `https://nirvoya.herokuapp.com/api/admin/${adminId}`,
      {}
    );
    dispatch({
      type: ADMIN_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ADMIN_DELETE_FAIL,
      payload: { message: message },
    });
  }
};

// admin signin
export const adminSignin = (adminData) => async (dispatch) => {
  dispatch({ type: ADMIN_SIGNIN_REQUEST, payload: adminData });

  try {
    const { data } = await Axios.post(
      "https://nirvoya.herokuapp.com/api/admin/signin",
      adminData
    );
    dispatch({ type: ADMIN_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("adminInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ADMIN_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// admin signout
export const adminSignout = () => (dispatch) => {
  localStorage.removeItem("adminInfo");
  dispatch({ type: ADMIN_SIGNOUT });
};
