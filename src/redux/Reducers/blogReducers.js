import {
  ALL_BLOG_FAIL,
  ALL_BLOG_REQUEST,
  ALL_BLOG_SUCCESS,
  BLOG_CREATE_FAIL,
  BLOG_CREATE_REQUEST,
  BLOG_CREATE_RESET,
  BLOG_CREATE_SUCCESS,
  BLOG_DELETE_FAIL,
  BLOG_DELETE_REQUEST,
  BLOG_DELETE_RESET,
  BLOG_DELETE_SUCCESS,
  BLOG_DETAILS_FAIL,
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_SUCCESS,
  BLOG_UPDATE_FAIL,
  BLOG_UPDATE_REQUEST,
  BLOG_UPDATE_RESET,
  BLOG_UPDATE_SUCCESS,
} from "../Constants/blogConstants";

// get all blog reducers
export const blogsReducers = (state = { loading: true, blogs: [] }, action) => {
  switch (action.type) {
    case ALL_BLOG_REQUEST:
      return { loading: true };
    case ALL_BLOG_SUCCESS:
      return { loading: false, success: true, blogs: action.payload };
    case ALL_BLOG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// blog create reducers
export const blogCreateReducers = (state = {}, action) => {
  switch (action.type) {
    case BLOG_CREATE_REQUEST:
      return { loading: true };
    case BLOG_CREATE_SUCCESS:
      return { loading: true, success: true, blogCreate: action.payload };
    case BLOG_CREATE_FAIL:
      return { loading: true, error: action.payload };
    case BLOG_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
// blog details reducers
export const blogDetailsReducers = (
  state = { loading: true, blogDetails: [] },
  action
) => {
  switch (action.type) {
    case BLOG_DETAILS_REQUEST:
      return { loading: true };
    case BLOG_DETAILS_SUCCESS:
      return { loading: false, success: true, blogDetails: action.payload };
    case BLOG_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// blog update reducers
export const blogUpdateReducers = (state = {}, action) => {
  switch (action.type) {
    case BLOG_UPDATE_REQUEST:
      return { loading: true };
    case BLOG_UPDATE_SUCCESS:
      return { loading: false, success: true, blogUpdate: action.payload };
    case BLOG_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case BLOG_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
// blog delete reducers
export const blogDeleteReducers = (state = {}, action) => {
  switch (action.type) {
    case BLOG_DELETE_REQUEST:
      return { loading: true };
    case BLOG_DELETE_SUCCESS:
      return { loading: false, success: true, blogDelete: action.payload };
    case BLOG_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case BLOG_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
