import {
  ALL_ENTREPRENEURS_FAIL,
  ALL_ENTREPRENEURS_REQUEST,
  ALL_ENTREPRENEURS_SUCCESS,
  ENTREPRENEURS_CREATE_FAIL,
  ENTREPRENEURS_CREATE_REQUEST,
  ENTREPRENEURS_CREATE_RESET,
  ENTREPRENEURS_CREATE_SUCCESS,
  ENTREPRENEURS_DELETE_FAIL,
  ENTREPRENEURS_DELETE_REQUEST,
  ENTREPRENEURS_DELETE_RESET,
  ENTREPRENEURS_DELETE_SUCCESS,
  ENTREPRENEURS_EDIT_FAIL,
  ENTREPRENEURS_EDIT_REQUEST,
  ENTREPRENEURS_EDIT_SUCCESS,
  ENTREPRENEURS_UPDATE_FAIL,
  ENTREPRENEURS_UPDATE_REQUEST,
  ENTREPRENEURS_UPDATE_RESET,
  ENTREPRENEURS_UPDATE_SUCCESS,
} from "../Constants/entrepreneursConstants";

// get all entrepreneurs
export const entrepreneursReducers = (
  state = { loading: true, entrepreneurs: [] },
  action
) => {
  switch (action.type) {
    case ALL_ENTREPRENEURS_REQUEST:
      return { loading: true };
    case ALL_ENTREPRENEURS_SUCCESS:
      return { loading: false, success: true, entrepreneurs: action.payload };
    case ALL_ENTREPRENEURS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// create entrepreneurs
export const entrepreneursCreateReducers = (state = {}, action) => {
  switch (action.type) {
    case ENTREPRENEURS_CREATE_REQUEST:
      return { loading: true };
    case ENTREPRENEURS_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        entrepreneurCreate: action.payload,
      };
    case ENTREPRENEURS_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ENTREPRENEURS_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
// edit entrepreneurs
export const entrepreneursEditReducers = (state = {}, action) => {
  switch (action.type) {
    case ENTREPRENEURS_EDIT_REQUEST:
      return { loading: true };
    case ENTREPRENEURS_EDIT_SUCCESS:
      return {
        loading: false,
        success: true,
        entrepreneurEdit: action.payload,
      };
    case ENTREPRENEURS_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// update entrepreneurs
export const entrepreneursUpdateReducers = (state = {}, action) => {
  switch (action.type) {
    case ENTREPRENEURS_UPDATE_REQUEST:
      return { loading: true };
    case ENTREPRENEURS_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        entrepreneurUpdate: action.payload,
      };
    case ENTREPRENEURS_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ENTREPRENEURS_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};
// delete entrepreneurs
export const entrepreneursDeleteReducers = (state = {}, action) => {
  switch (action.type) {
    case ENTREPRENEURS_DELETE_REQUEST:
      return { loading: true };
    case ENTREPRENEURS_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        entrepreneurDelete: action.payload,
      };
    case ENTREPRENEURS_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case ENTREPRENEURS_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
