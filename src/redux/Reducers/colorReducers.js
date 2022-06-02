//Product Create Reducers

import {
  ADD_COLOR_FAIL,
  ADD_COLOR_REQUEST,
  ADD_COLOR_SUCCESS,
  COLOR_CREATE_FAIL,
  COLOR_CREATE_REQUEST,
  COLOR_CREATE_RESET,
  COLOR_CREATE_SUCCESS,
  COLOR_DELETE_FAIL,
  COLOR_DELETE_REQUEST,
  COLOR_DELETE_RESET,
  COLOR_DELETE_SUCCESS,
  COLOR_DETAILS_FAIL,
  COLOR_DETAILS_REQUEST,
  COLOR_DETAILS_SUCCESS,
  COLOR_UPDATE_FAIL,
  COLOR_UPDATE_REQUEST,
  COLOR_UPDATE_RESET,
  COLOR_UPDATE_SUCCESS,
} from "../Constants/colorConstants";

//Get Color reducers
export const colorReducers = (
  state = { loading: true, colors: [] },
  action
) => {
  switch (action.type) {
    case ADD_COLOR_REQUEST:
      return { loading: true };

    case ADD_COLOR_SUCCESS:
      return { loading: false, success: true, colors: action.payload };

    case ADD_COLOR_FAIL:
      return { loading: false, colors: action.payload };

    default:
      return state;
  }
};

//Single Color detail reducers
export const colorDetailsReducer = (
  state = { loadding: true, color: {} },
  action
) => {
  switch (action.type) {
    case COLOR_DETAILS_REQUEST:
      return { loadding: true };
    case COLOR_DETAILS_SUCCESS:
      return { loadding: false, color: action.payload };
    case COLOR_DETAILS_FAIL:
      return { loadding: false, error: action.payload };

    default:
      return state;
  }
};

//Create Color reducers
export const colorCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COLOR_CREATE_REQUEST:
      return { loading: true };
    case COLOR_CREATE_SUCCESS:
      return { loading: false, success: true, color: action.payload };
    case COLOR_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case COLOR_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

//Color Delete Reducers

export const colorDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COLOR_DELETE_REQUEST:
      return { loading: true };
    case COLOR_DELETE_SUCCESS:
      return { loading: false, success: true };
    case COLOR_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case COLOR_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

//Color Update Reducers

export const colorUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case COLOR_UPDATE_REQUEST:
      return { loading: true };
    case COLOR_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case COLOR_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case COLOR_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
