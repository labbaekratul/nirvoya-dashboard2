import Axios from "axios";
import {
  ADD_CATEGORY_FAIL,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  CATEGORY_CHILDATA_FAIL,
  CATEGORY_CHILDATA_REQUEST,
  CATEGORY_CHILDATA_SUCCESS,
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  GET_HOMECATEGORY_FAIL,
  GET_HOMECATEGORY_REQUEST,
  GET_HOMECATEGORY_SUCCESS,
  SUB_CATEGORY_CHILDATA_FAIL,
  SUB_CATEGORY_CHILDATA_REQUEST,
  SUB_CATEGORY_CHILDATA_SUCCESS,
} from "../Constants/categoryConstants";

//Get all Category Name
export const addCategory = () => async (dispatch) => {
  dispatch({
    type: ADD_CATEGORY_REQUEST,
  });

  try {
    const { data } = await Axios.get(
      "https://nirvoya.herokuapp.com/api/category"
    );
    dispatch({
      type: ADD_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_CATEGORY_FAIL,
      payload: { message: error.message },
    });
  }
};

//Get all homePage Category Name
export const getHomeCategory = () => async (dispatch) => {
  dispatch({
    type: GET_HOMECATEGORY_REQUEST,
  });

  try {
    const { data } = await Axios.get(
      "https://nirvoya.herokuapp.com/api/discategory/main"
    );
    dispatch({
      type: GET_HOMECATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_HOMECATEGORY_FAIL,
      payload: { message: error.message },
    });
  }
};

// Single category Action details

export const categoryDetail = (id) => async (dispatch) => {
  dispatch({
    type: CATEGORY_DETAILS_REQUEST,
    payload: id,
  });
  try {
    const { data } = await Axios.get(
      `https://nirvoya.herokuapp.com/api/category/${id}`
    );
    dispatch({
      type: CATEGORY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_DETAILS_FAIL,
      payload: { message: error.message },
    });
  }
};

//Create category Action

export const createCategories = (category) => async (dispatch) => {
  dispatch({
    type: CATEGORY_CREATE_REQUEST,
    payload: { category },
  });

  try {
    const { data } = await Axios.post(
      "https://nirvoya.herokuapp.com/api/category",
      category
    );
    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CATEGORY_CREATE_FAIL, payload: message });
  }
};

//Update category Action

export const updateCategory = (category) => async (dispatch) => {
  dispatch({ type: CATEGORY_UPDATE_REQUEST, payload: category });

  try {
    const { data } = await Axios.put(
      `/api/category/${category._id}`,
      category,
      {}
    );
    dispatch({ type: CATEGORY_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CATEGORY_UPDATE_FAIL, error: message });
  }
};

//Delete category Action

export const deleteCategories = (categoryId) => async (dispatch) => {
  dispatch({ type: CATEGORY_DELETE_REQUEST, payload: categoryId });

  try {
    Axios.delete(
      `https://nirvoya.herokuapp.com/api/category/${categoryId}`,
      {}
    );
    dispatch({ type: CATEGORY_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CATEGORY_DELETE_FAIL, payload: message });
  }
};

//Category Child data Action

export const childCategoryList = (parentID) => async (dispatch) => {
  dispatch({
    type: CATEGORY_CHILDATA_REQUEST,
    payload: parentID.id,
  });
  try {
    const { data } = await Axios.get(
      `https://nirvoya.herokuapp.com/api/category/parentID?parentId=${parentID.id}`
    );
    dispatch({
      type: CATEGORY_CHILDATA_SUCCESS,
      payload: data,
      parentNamez: parentID.parentName,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_CHILDATA_FAIL,
      payload: { message: error.message },
    });
  }
};

//Sub Child data action

export const subChildCategoryList = (parentID) => async (dispatch) => {
  dispatch({
    type: SUB_CATEGORY_CHILDATA_REQUEST,
    payload: parentID.id,
  });
  try {
    const { data } = await Axios.get(
      `https://nirvoya.herokuapp.com/api/category/subparentID?subparentID=${parentID.id}`
    );
    dispatch({
      type: SUB_CATEGORY_CHILDATA_SUCCESS,
      payload: data,
      parentNamez: parentID.parentName,
    });
  } catch (error) {
    dispatch({
      type: SUB_CATEGORY_CHILDATA_FAIL,
      payload: { message: error.message },
    });
  }
};
