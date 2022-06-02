import {
  ADD_CATEGORY_FAIL,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  CATEGORY_CHILDATA_FAIL,
  CATEGORY_CHILDATA_REQUEST,
  CATEGORY_CHILDATA_RESET,
  CATEGORY_CHILDATA_SUCCESS,
  CATEGORY_CREATE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_RESET,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_RESET,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_RESET,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_RESET,
  CATEGORY_UPDATE_SUCCESS,
  GET_HOMECATEGORY_FAIL,
  GET_HOMECATEGORY_REQUEST,
  GET_HOMECATEGORY_SUCCESS,
  SUB_CATEGORY_CHILDATA_FAIL,
  SUB_CATEGORY_CHILDATA_REQUEST,
  SUB_CATEGORY_CHILDATA_RESET,
  SUB_CATEGORY_CHILDATA_SUCCESS,
} from "../Constants/categoryConstants";

//GET ALL CATEGORY REDUCER

export const categoryReducers = (
  state = { loading: true, categories: [] },
  action
) => {
  switch (action.type) {
    case ADD_CATEGORY_REQUEST:
      return { loading: true };

    case ADD_CATEGORY_SUCCESS:
      return { loading: false, categories: action.payload };

    case ADD_CATEGORY_FAIL:
      return { loading: false, categories: action.payload };

    default:
      return state;
  }
};

//GET ALL HOMEPAGE CATEGORY REDUCER

export const homeCategoryReducers = (
  state = { loading: true, categories: [] },
  action
) => {
  switch (action.type) {
    case GET_HOMECATEGORY_REQUEST:
      return { loading: true };

    case GET_HOMECATEGORY_SUCCESS:
      return { loading: false, categories: action.payload };

    case GET_HOMECATEGORY_FAIL:
      return { loading: false, categories: action.payload };

    default:
      return state;
  }
};

// SINGLE CATEGORY REDUCER

export const categoryDetailsReducer = (
  state = { loadding: true, color: {} },
  action
) => {
  switch (action.type) {
    case CATEGORY_DETAILS_REQUEST:
      return { loadding: true };
    case CATEGORY_DETAILS_SUCCESS:
      return { loadding: false, success: true, category: action.payload };

    case CATEGORY_DETAILS_FAIL:
      return { loadding: false, error: action.payload };
    case CATEGORY_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};

// CREATE CATEGORY REDUCERS

export const categoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_REQUEST:
      return { loading: true };
    case CATEGORY_CREATE_SUCCESS:
      return { loading: false, success: true, cate: action.payload };
    case CATEGORY_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

//CATEGORY Update Reducers

export const categoryUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_UPDATE_REQUEST:
      return { loading: true };
    case CATEGORY_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case CATEGORY_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

// DELETE CATEGORY REDUCERS

export const categoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return { loading: true };
    case CATEGORY_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CATEGORY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

//CHILD CATEGORY ALL LIST

export const childCategoryReducer = (
  state = { loadding: true, color: {} },
  action
) => {
  switch (action.type) {
    case CATEGORY_CHILDATA_REQUEST:
      return { loadding: true };
    case CATEGORY_CHILDATA_SUCCESS:
      return {
        loadding: false,
        success: true,
        categoryChild: action.payload,
        parentName: action.parentNamez,
      };

    case CATEGORY_CHILDATA_FAIL:
      return { loadding: false, error: action.payload };
    case CATEGORY_CHILDATA_RESET:
      return {};

    default:
      return state;
  }
};

//SUB CHILD CATEGORY ALL LIST

export const subChildCategoryReducer = (
  state = { loadding: true, color: {} },
  action
) => {
  switch (action.type) {
    case SUB_CATEGORY_CHILDATA_REQUEST:
      return { loadding: true };
    case SUB_CATEGORY_CHILDATA_SUCCESS:
      return {
        loadding: false,
        success: true,
        subCategoryChild: action.payload,
        parentName: action.parentNamez,
      };

    case SUB_CATEGORY_CHILDATA_FAIL:
      return { loadding: false, error: action.payload };
    case SUB_CATEGORY_CHILDATA_RESET:
      return {};

    default:
      return state;
  }
};
