import {
  ALL_BANNER_FAIL,
  ALL_BANNER_REQUEST,
  ALL_BANNER_SUCCESS,
  BANNER_CREATE_FAIL,
  BANNER_CREATE_REQUEST,
  BANNER_CREATE_RESET,
  BANNER_CREATE_SUCCESS,
  BANNER_DELETE_FAIL,
  BANNER_DELETE_REQUEST,
  BANNER_DELETE_RESET,
  BANNER_DELETE_SUCCESS,
  BANNER_DETAILS_FAIL,
  BANNER_DETAILS_REQUEST,
  BANNER_DETAILS_SUCCESS,
  BANNER_UPDATE_FAIL,
  BANNER_UPDATE_REQUEST,
  BANNER_UPDATE_RESET,
  BANNER_UPDATE_SUCCESS,
} from "../Constants/bannerConstant";

// Get Banner reducers
export const bannerReducers = (
  state = { loading: true, banners: [] },
  action
) => {
  switch (action.type) {
    case ALL_BANNER_REQUEST:
      return { loading: true };

    case ALL_BANNER_SUCCESS:
      return { loading: false, success: true, banners: action.payload };

    case ALL_BANNER_FAIL:
      return { loading: false, banners: action.payload };

    default:
      return state;
  }
};

// Single Banner detail reducers
export const bannerDetailsReducer = (
  state = { loadding: true, banner: {} },
  action
) => {
  switch (action.type) {
    case BANNER_DETAILS_REQUEST:
      return { loadding: true };
    case BANNER_DETAILS_SUCCESS:
      return { loadding: false, success: true, banner: action.payload };
    case BANNER_DETAILS_FAIL:
      return { loadding: false, error: action.payload };

    default:
      return state;
  }
};

// Create Banner reducers
export const bannerCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BANNER_CREATE_REQUEST:
      return { loading: true };
    case BANNER_CREATE_SUCCESS:
      return { loading: false, success: true, bannerCreate: action.payload };
    case BANNER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case BANNER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// Banner Update Reducers
export const bannerUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case BANNER_UPDATE_REQUEST:
      return { loading: true };
    case BANNER_UPDATE_SUCCESS:
      return { loading: false, success: true, bannerUpdate: action.payload };
    case BANNER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case BANNER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

// Banner Delete Reducers
export const bannerDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BANNER_DELETE_REQUEST:
      return { loading: true };
    case BANNER_DELETE_SUCCESS:
      return { loading: false, success: true, bannerDelete: action.payload };
    case BANNER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case BANNER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
