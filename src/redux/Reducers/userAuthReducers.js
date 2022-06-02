import {
  ALL_GOOGLE_USER_FAIL,
  ALL_GOOGLE_USER_REQUEST,
  ALL_GOOGLE_USER_SUCCESS,
  ALL_USER_FAIL,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  GOOGLE_REGISTER_FAIL,
  GOOGLE_REGISTER_REQUEST,
  GOOGLE_REGISTER_RESET,
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
  USER_DELETE_RESET,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_RESET,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
  GOOGLE_USER_DETAILS_RESET,
} from "../Constants/userAuthConstant";

//normal user register
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

// register with google
export const googleRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case GOOGLE_REGISTER_REQUEST:
      return { loading: true };
    case GOOGLE_REGISTER_SUCCESS:
      return {
        loading: false,
        registerSuccess: true,
        googleUserInfo: action.payload,
      };
    case GOOGLE_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case GOOGLE_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

// user signin
export const userSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };

    case USER_SIGNIN_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };

    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_SIGNOUT:
      return {};

    default:
      return state;
  }
};

// signin with google
export const googleSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case GOOGLE_SIGNIN_REQUEST:
      return { loading: true };

    case GOOGLE_SIGNIN_SUCCESS:
      return { loading: false, success: true, googleUserInfo: action.payload };

    case GOOGLE_SIGNIN_FAIL:
      return { loading: false, error: action.payload };

    case GOOGLE_SIGNOUT:
      return {};

    default:
      return state;
  }
};

// user list
export const usersReducer = (state = { loading: true, users: [] }, action) => {
  switch (action.type) {
    case ALL_USER_REQUEST:
      return { loading: true };
    case ALL_USER_SUCCESS:
      return { loading: false, success: true, users: action.payload };
    case ALL_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//Google User List
export const googleUsersReducer = (
  state = { loading: true, users: [] },
  action
) => {
  switch (action.type) {
    case ALL_GOOGLE_USER_REQUEST:
      return { loading: true };
    case ALL_GOOGLE_USER_SUCCESS:
      return { loading: false, success: true, googleUsers: action.payload };
    case ALL_GOOGLE_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//single user details
export const userDetailsReducer = (
  state = { loadding: true, user: {} },
  action
) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loadding: true };
    case USER_DETAILS_SUCCESS:
      return { loadding: false, success: true, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loadding: false, error: action.payload };
    case USER_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

//Google single user details
export const googleUserDetailsReducer = (
  state = { loadding: true, user: {} },
  action
) => {
  switch (action.type) {
    case GOOGLE_USER_DETAILS_REQUEST:
      return { loadding: true };
    case GOOGLE_USER_DETAILS_SUCCESS:
      return { loadding: false, success: true, googleUser: action.payload };
    case GOOGLE_USER_DETAILS_FAIL:
      return { loadding: false, error: action.payload };
    case GOOGLE_USER_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

// user udpate reducers
export const userUpdateReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true, userUpdate: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
// delete user reducers
export const userDeleteReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true, sizeDelete: action.payload };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case USER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
