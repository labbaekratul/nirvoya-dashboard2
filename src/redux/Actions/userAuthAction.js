import Axios from "axios";
import {
  ALL_GOOGLE_USER_FAIL,
  ALL_GOOGLE_USER_REQUEST,
  ALL_GOOGLE_USER_SUCCESS,
  ALL_USER_FAIL,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  GOOGLE_REGISTER_FAIL,
  GOOGLE_REGISTER_REQUEST,
  GOOGLE_REGISTER_SUCCESS,
  GOOGLE_SIGNIN_FAIL,
  GOOGLE_SIGNIN_REQUEST,
  GOOGLE_SIGNIN_SUCCESS,
  GOOGLE_SIGNOUT,
  GOOGLE_USER_DETAILS_FAIL,
  GOOGLE_USER_DETAILS_REQUEST,
  GOOGLE_USER_DETAILS_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../Constants/userAuthConstant";

// register
export const registers = (userData) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: { userData },
  });

  try {
    const { data } = await Axios.post(
      "https://nirvoya.herokuapp.com/api/user/register",
      userData
    );
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.message
        ? "Duplicate Email or Phone number"
        : error.message,
    });
  }
};

// register with google
export const googleRegister = (userData) => async (dispatch) => {
  dispatch({
    type: GOOGLE_REGISTER_REQUEST,
    payload: { userData },
  });
  try {
    const { data } = await Axios.post(
      "https://nirvoya.herokuapp.com/api/user/googleRegister",
      userData
    );
    dispatch({ type: GOOGLE_REGISTER_SUCCESS, payload: data });
    localStorage.setItem("googleUserInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: GOOGLE_REGISTER_FAIL,
      payload: error.message
        ? "Duplicate Email or Phone number"
        : error.message,
    });
  }
};

// Single user deatils
export const userDetails = (id) => async (dispatch, getState) => {
  dispatch({
    type: USER_DETAILS_REQUEST,
    payload: id,
  });
  const {
    userSignin: { userInfo },
    adminSignin: { adminInfo },
  } = getState();

  try {
    const { data } = await Axios.get(
      `https://nirvoya.herokuapp.com/api/user/${id}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo?.token || adminInfo?.token}`,
        },
      }
    );
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: { message: error.message },
    });
  }
};

// Single Google user deatils
export const googleUserDetails = (id) => async (dispatch) => {
  console.log(id, "using man");
  dispatch({
    type: GOOGLE_USER_DETAILS_REQUEST,
    payload: id,
  });
  // const {
  //   userSignin: { userInfo },
  //   adminSignin: { adminInfo },
  // } = getState();

  try {
    const { data } = await Axios.get(
      `https://nirvoya.herokuapp.com/api/user/googleUsers/${id}`,
      {
        // headers: {
        //   Authorization: `Bearer ${userInfo?.token || adminInfo?.token}`,
        // },
      }
    );
    dispatch({
      type: GOOGLE_USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GOOGLE_USER_DETAILS_FAIL,
      payload: { message: error.message },
    });
  }
};

// user update
export const updateUser = (userData) => async (dispatch, getState) => {
  dispatch({
    type: USER_UPDATE_REQUEST,
    payload: userData,
  });
  const {
    userSignin: { userInfo },
    adminSignin: { adminInfo },
  } = getState();

  try {
    const { data } = await Axios.put(
      `https://nirvoya.herokuapp.com/api/user/${userData._id}`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${userInfo?.token || adminInfo?.token}`,
        },
      }
    );
    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.message
        ? "Euplicate Email or Phone number"
        : error.message,
    });
  }
};

// user delete
export const deleteUser = (userId) => async (dispatch) => {
  console.log("action", userId);
  dispatch({ type: USER_DELETE_REQUEST, payload: userId });

  const { data } = await Axios.delete(
    `https://nirvoya.herokuapp.com/api/user/${userId}`
  );
  try {
    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DELETE_FAIL, payload: message });
  }
};

// user list
export const users =
  ({ phone = " " }) =>
  async (dispatch) => {
    dispatch({
      type: ALL_USER_REQUEST,
    });

    try {
      const { data } = await Axios.get(
        `https://nirvoya.herokuapp.com/api/user?phone=${phone}`
      );
      dispatch({
        type: ALL_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_USER_FAIL,
        payload: { message: error.message },
      });
    }
  };

//Google User List
export const googleAllUsers = () => async (dispatch) => {
  dispatch({
    type: ALL_GOOGLE_USER_REQUEST,
  });

  try {
    const { data } = await Axios.get(
      "https://nirvoya.herokuapp.com/api/user/googleUsers"
    );
    dispatch({
      type: ALL_GOOGLE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_GOOGLE_USER_FAIL,
      payload: { message: error.message },
    });
  }
};

// signin
export const signin = (userData) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: userData });

  try {
    const { data } = await Axios.post(
      "https://nirvoya.herokuapp.com/api/user/signin",
      userData
    );
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Signin with Google
export const googleSignin = (userData) => async (dispatch) => {
  dispatch({ type: GOOGLE_SIGNIN_REQUEST, payload: userData });

  try {
    const { data } = await Axios.post(
      "https://nirvoya.herokuapp.com/api/user/googleSignin",
      userData
    );
    dispatch({ type: GOOGLE_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("googleUserInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: GOOGLE_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// signout
export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_SIGNOUT });
};

// google signout
export const GoogleSignout = () => (dispatch) => {
  localStorage.removeItem("googleUserInfo");
  dispatch({ type: GOOGLE_SIGNOUT });
};
