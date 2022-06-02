import Axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  HOME_PAGE_PRODUCT_CATEGORY_DATA_FAIL,
  HOME_PAGE_PRODUCT_CATEGORY_DATA_REQUEST,
  HOME_PAGE_PRODUCT_CATEGORY_DATA_SUCCESS,
  HOME_PAGE_PRODUCT_FEATURE_DATA_FAIL,
  HOME_PAGE_PRODUCT_FEATURE_DATA_REQUEST,
  HOME_PAGE_PRODUCT_FEATURE_DATA_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_QNA_CREATE_FAIL,
  PRODUCT_QNA_CREATE_REQUEST,
  PRODUCT_QNA_CREATE_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_WISHLISTADD_FAIL,
  PRODUCT_WISHLISTADD_REQUEST,
  PRODUCT_WISHLISTADD_SUCCESS,
  PRODUCT_WISHLISTREMOVE_FAIL,
  PRODUCT_WISHLISTREMOVE_REQUEST,
  PRODUCT_WISHLISTREMOVE_SUCCESS,
} from "../Constants/productContants";

//All products Actions

export const allProduct =
  ({
    pageSize = "",
    pageNumber = "",
    name = "",
    mainCategory = "",
    category = "",
    subCategory = "",
    reviews = "",
    entrepreneur = "",
    order = "",
    productCode = "",
    min = 0,
    max = 0,
    rating = 0,
  }) =>
  async (dispatch) => {
    dispatch({
      type: ALL_PRODUCT_REQUEST,
    });

    try {
      const { data } = await Axios.get(
        `https://nirvoya.herokuapp.com/api/products?pageSize=${pageSize}&pageNumber=${pageNumber}&name=${name}&mainCategory=${mainCategory}&category=${category}&subCategory=${subCategory}&reviews=${reviews}&entrepreneur=${entrepreneur}&min=${min}&max=${max}&rating=${rating}&order=${order}&productCode=${productCode}`
      );

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: { message: error.message },
      });
    }
  };

//Product details Actions
export const productDetails = (id) => async (dispatch) => {
  dispatch({
    type: PRODUCT_DETAILS_REQUEST,
    payload: id,
  });

  try {
    const { data } = await Axios.get(
      `https://nirvoya.herokuapp.com/api/products/admin/${id}`
    );
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: { message: error.message },
    });
  }
};

//Product create
export const createProduct = (product) => async (dispatch) => {
  dispatch({
    type: PRODUCT_CREATE_REQUEST,
    payload: { product },
  });

  const { data } = await Axios.post(
    "https://nirvoya.herokuapp.com/api/products",
    product
  );

  try {
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Product Add WishList
export const addWishList = (product) => async (dispatch) => {
  dispatch({ type: PRODUCT_WISHLISTADD_REQUEST, payload: product });

  try {
    const { data } = await Axios.put(
      `https://nirvoya.herokuapp.com/api/products/${product._id}/addWishList`,
      product,
      {}
    );
    dispatch({ type: PRODUCT_WISHLISTADD_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_WISHLISTADD_FAIL, payload: message });
  }
};

//Product Remove WishList
export const removeWishList = (product) => async (dispatch) => {
  dispatch({ type: PRODUCT_WISHLISTREMOVE_REQUEST, payload: product });

  try {
    const { data } = await Axios.put(
      `https://nirvoya.herokuapp.com/api/products/${product._id}/removeWishList`,
      product,
      {}
    );
    dispatch({ type: PRODUCT_WISHLISTREMOVE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_WISHLISTREMOVE_FAIL, payload: message });
  }
};

//localStorage data for product input
//Update Products Action
export const updateProduct = (product) => async (dispatch) => {
  dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });

  try {
    const { data } = await Axios.put(
      `https://nirvoya.herokuapp.com/api/products/${product._id}`,
      product,
      {}
    );
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_UPDATE_FAIL, payload: message });
  }
};

//Delete Products Action
export const deleteProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });

  try {
    Axios.delete(`https://nirvoya.herokuapp.com/api/products/${productId}`, {});
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
  }
};

// home page product category action
export const homePageProductCategory = () => async (dispatch) => {
  dispatch({
    type: HOME_PAGE_PRODUCT_CATEGORY_DATA_REQUEST,
  });

  try {
    const { data } = await Axios.get(
      "https://nirvoya.herokuapp.com/api/products/homePage"
    );

    dispatch({
      type: HOME_PAGE_PRODUCT_CATEGORY_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: HOME_PAGE_PRODUCT_CATEGORY_DATA_FAIL,
      payload: { message: error.message },
    });
  }
};

// home page product feature action
export const homePageProductFeature = () => async (dispatch) => {
  dispatch({
    type: HOME_PAGE_PRODUCT_FEATURE_DATA_REQUEST,
  });

  try {
    const { data } = await Axios.get(
      "https://nirvoya.herokuapp.com/api/products/feature"
    );

    dispatch({
      type: HOME_PAGE_PRODUCT_FEATURE_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: HOME_PAGE_PRODUCT_FEATURE_DATA_FAIL,
      payload: { message: error.message },
    });
  }
};

// Prodict details Page review
export const createReview = (productId, review) => async (dispatch) => {
  dispatch({ type: PRODUCT_REVIEW_CREATE_REQUEST });
  try {
    const { data } = await Axios.post(
      `https://nirvoya.herokuapp.com/api/products/${productId}/reviews`,
      review
    );
    dispatch({
      type: PRODUCT_REVIEW_CREATE_SUCCESS,
      payload: data.review,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_REVIEW_CREATE_FAIL, payload: message });
  }
};

// Prodict details Page QnA
export const createQnA = (productId, QnA) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_QNA_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `https://nirvoya.herokuapp.com/api/products/${productId}/QnA`,
      QnA,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: PRODUCT_QNA_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_QNA_CREATE_FAIL, payload: message });
  }
};
