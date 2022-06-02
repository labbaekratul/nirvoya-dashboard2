import {
  ADMIN_CREATE_FAIL,
  ADMIN_CREATE_REQUEST,
  ADMIN_CREATE_RESET,
  ADMIN_CREATE_SUCCESS,
  ADMIN_DELETE_FAIL,
  ADMIN_DELETE_REQUEST,
  ADMIN_DELETE_RESET,
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
  ADMIN_UPDATE_RESET,
  ADMIN_UPDATE_SUCCESS,
  ALL_ADMIN_FAIL,
  ALL_ADMIN_REQUEST,
  ALL_ADMIN_SUCCESS,
} from "../Constants/adminConstant";

// get all admin reducers
export const adminsReducers = (
  state = { loading: true, admins: [] },
  action
) => {
  switch (action.type) {
    case ALL_ADMIN_REQUEST:
      return { loading: true };
    case ALL_ADMIN_SUCCESS:
      return { loading: false, success: true, admins: action.payload };
    case ALL_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// admin create reducers
export const adminCreateReducers = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_CREATE_REQUEST:
      return { loading: true };
    case ADMIN_CREATE_SUCCESS:
      return { loading: true, success: true, adminCreate: action.payload };
    case ADMIN_CREATE_FAIL:
      return { loading: true, error: action.payload };
    case ADMIN_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
// admin details reducers
export const adminDetailsReducers = (
  state = { loading: true, adminDetails: [] },
  action
) => {
  switch (action.type) {
    case ADMIN_DETAILS_REQUEST:
      return { loading: true };
    case ADMIN_DETAILS_SUCCESS:
      return { loading: false, success: true, adminDetails: action.payload };
    case ADMIN_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// admin update reducers
export const adminUpdateReducers = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_REQUEST:
      return { loading: true };
    case ADMIN_UPDATE_SUCCESS:
      return { loading: false, success: true, adminUpdate: action.payload };
    case ADMIN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
// admin delete reducers
export const adminDeleteReducers = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETE_REQUEST:
      return { loading: true };
    case ADMIN_DELETE_SUCCESS:
      return { loading: false, success: true, adminDelete: action.payload };
    case ADMIN_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
// admin signin
export const adminSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_SIGNIN_REQUEST:
      return { loading: true };

    case ADMIN_SIGNIN_SUCCESS:
      return { loading: false, success: true, adminInfo: action.payload };

    case ADMIN_SIGNIN_FAIL:
      return { loading: false, error: action.payload };

    case ADMIN_SIGNOUT:
      return {};

    default:
      return state;
  }
};
