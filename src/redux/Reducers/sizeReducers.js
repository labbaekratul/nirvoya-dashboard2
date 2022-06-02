import {
  ALL_SIZE_FAIL,
  ALL_SIZE_REQUEST,
  ALL_SIZE_SUCCESS,
  SIZE_CREATE_FAIL,
  SIZE_CREATE_REQUEST,
  SIZE_CREATE_RESET,
  SIZE_CREATE_SUCCESS,
  SIZE_DELETE_FAIL,
  SIZE_DELETE_REQUEST,
  SIZE_DELETE_RESET,
  SIZE_DELETE_SUCCESS,
  SIZE_EDIT_FAIL,
  SIZE_EDIT_REQUEST,
  SIZE_EDIT_SUCCESS,
  SIZE_UPDATE_FAIL,
  SIZE_UPDATE_REQUEST,
  SIZE_UPDATE_RESET,
  SIZE_UPDATE_SUCCESS,
} from "../Constants/sizeConstants";

// GET ALL SIZE REDUCERS
export const sizesReducers = (state = { loading: true, sizes: [] }, action) => {
  switch (action.type) {
    case ALL_SIZE_REQUEST:
      return { loading: true };

    case ALL_SIZE_SUCCESS:
      return { loading: false, success: true, sizes: action.payload };

    case ALL_SIZE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
// create size reducers
export const sizeCreateReducers = (state = {}, action) => {
  switch (action.type) {
    case SIZE_CREATE_REQUEST:
      return { loading: true };
    case SIZE_CREATE_SUCCESS:
      return { loading: false, success: true, sizeCreate: action.payload };
    case SIZE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SIZE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
// edit size reducers
export const editSizeReducers = (
  state = { loading: true, sizeEdit: [] },
  action
) => {
  switch (action.type) {
    case SIZE_EDIT_REQUEST:
      return { loadding: true };

    case SIZE_EDIT_SUCCESS:
      return { loadding: false, success: true, sizeEdit: action.payload };

    case SIZE_EDIT_FAIL:
      return { loadding: false, error: action.payload };

    default:
      return state;
  }
};
// update size reducers
export const updateSizeReducers = (state = {}, action) => {
  switch (action.type) {
    case SIZE_UPDATE_REQUEST:
      return { loading: true };
    case SIZE_UPDATE_SUCCESS:
      return { loading: false, success: true, sizeUpdate: action.payload };
    case SIZE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SIZE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
// delete size reducers
export const sizeDeleteReducers = (state = {}, action) => {
  switch (action.type) {
    case SIZE_DELETE_REQUEST:
      return { loading: true };
    case SIZE_DELETE_SUCCESS:
      return { loading: false, success: true, sizeDelete: action.payload };
    case SIZE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case SIZE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
