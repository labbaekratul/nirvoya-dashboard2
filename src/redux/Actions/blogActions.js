import Axios from "axios";
import {
  ALL_BLOG_FAIL,
  ALL_BLOG_REQUEST,
  ALL_BLOG_SUCCESS,
  BLOG_CREATE_FAIL,
  BLOG_CREATE_REQUEST,
  BLOG_CREATE_SUCCESS,
  BLOG_DELETE_FAIL,
  BLOG_DELETE_REQUEST,
  BLOG_DELETE_SUCCESS,
  BLOG_DETAILS_FAIL,
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_SUCCESS,
  BLOG_UPDATE_FAIL,
  BLOG_UPDATE_REQUEST,
  BLOG_UPDATE_SUCCESS,
} from "../Constants/blogConstants";

// get all blog list
export const getBlogs =
  ({ pageSize, pageNumber }) =>
  async (dispatch) => {
    dispatch({
      type: ALL_BLOG_REQUEST,
    });

    try {
      const { data } = await Axios.get(
        `https://nirvoya.herokuapp.com/api/blog?pageSize=${pageSize}&pageNumber=${pageNumber}`
      );
      dispatch({
        type: ALL_BLOG_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_BLOG_FAIL,
        payload: { message: error.message },
      });
    }
  };
// blog create
export const createBlog = (blog) => async (dispatch) => {
  dispatch({
    type: BLOG_CREATE_REQUEST,
    payload: blog,
  });

  try {
    const { data } = await Axios.post(
      "https://nirvoya.herokuapp.com/api/blog/",
      blog
    );
    dispatch({
      type: BLOG_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BLOG_CREATE_FAIL,
      payload: message,
    });
  }
};
// blog details
export const detailsBlog = (id) => async (dispatch) => {
  dispatch({
    type: BLOG_DETAILS_REQUEST,
    payload: id,
  });
  try {
    const { data } = await Axios.get(
      `https://nirvoya.herokuapp.com/api/blog/${id}`
    );
    dispatch({
      type: BLOG_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOG_DETAILS_FAIL,
      payload: { message: error.message },
    });
  }
};
// blog update
export const updateBlog = (blogData) => async (dispatch) => {
  dispatch({
    type: BLOG_UPDATE_REQUEST,
    payload: blogData,
  });
  try {
    const { data } = await Axios.put(
      `https://nirvoya.herokuapp.com/api/blog/${blogData._id}`,
      blogData
    );
    dispatch({
      type: BLOG_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BLOG_UPDATE_FAIL,
      payload: { message: message },
    });
  }
};
// blog delete
export const deleteBlog = (blogId) => async (dispatch) => {
  dispatch({
    type: BLOG_DELETE_REQUEST,
    payload: blogId,
  });

  try {
    const { data } = await Axios.delete(
      `https://nirvoya.herokuapp.com/api/blog/${blogId}`,
      {}
    );
    dispatch({
      type: BLOG_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: BLOG_DELETE_FAIL,
      payload: { message: message },
    });
  }
};
