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
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_RESET,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_RESET,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_QNA_CREATE_FAIL,
  PRODUCT_QNA_CREATE_REQUEST,
  PRODUCT_QNA_CREATE_RESET,
  PRODUCT_QNA_CREATE_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAIL,
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_RESET,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_WISHLISTADD_FAIL,
  PRODUCT_WISHLISTADD_REQUEST,
  PRODUCT_WISHLISTADD_RESET,
  PRODUCT_WISHLISTADD_SUCCESS,
  PRODUCT_WISHLISTREMOVE_FAIL,
  PRODUCT_WISHLISTREMOVE_REQUEST,
  PRODUCT_WISHLISTREMOVE_RESET,
  PRODUCT_WISHLISTREMOVE_SUCCESS,
} from "../Constants/productContants";

export const productReducers = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return { loading: true };

    case ALL_PRODUCT_SUCCESS:
      return { loading: false, success: true, products: action.payload };

    case ALL_PRODUCT_FAIL:
      return { loading: false, error: action.payload.products };

    default:
      return state;
  }
};

//Single product details reducers
export const productDetailsReducer = (
  state = { loadding: true, product: {} },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loadding: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loadding: false, success: true, product: action.payload };

    case PRODUCT_DETAILS_FAIL:
      return { loadding: false, error: action.payload };
    case PRODUCT_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};

//Product Create Reducers
export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        Product: action.payload,
      };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

//Product addWishList Reducers
export const wishListAddReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_WISHLISTADD_REQUEST:
      return { loading: true };
    case PRODUCT_WISHLISTADD_SUCCESS:
      return {
        loading: false,
        addWishListSuccess: true,
        addWishList: action.payload,
      };
    case PRODUCT_WISHLISTADD_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_WISHLISTADD_RESET:
      return {};
    default:
      return state;
  }
};

//Product removeWishList Reducers
export const wishListRemoveReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_WISHLISTREMOVE_REQUEST:
      return { loading: true };
    case PRODUCT_WISHLISTREMOVE_SUCCESS:
      return {
        loading: false,
        removeWishListSuccess: true,
        addWishList: action.payload,
      };
    case PRODUCT_WISHLISTREMOVE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_WISHLISTREMOVE_RESET:
      return {};
    default:
      return state;
  }
};

//Product Delete Reducers
export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true, productDelete: action.payload };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

//Product Update Reducers
export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, productUpdate: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

// home page product category
export const homePageProductCategoryReducer = (
  state = { loading: true, categoryProducts: [] },
  action
) => {
  switch (action.type) {
    case HOME_PAGE_PRODUCT_CATEGORY_DATA_REQUEST:
      return { loading: true };

    case HOME_PAGE_PRODUCT_CATEGORY_DATA_SUCCESS:
      return {
        loading: false,
        success: true,
        categoryProducts: action.payload,
      };

    case HOME_PAGE_PRODUCT_CATEGORY_DATA_FAIL:
      return { loading: false, categoryProducts: action.payload };

    default:
      return state;
  }
};

// home page product feature
export const homePageProductFeatureReducer = (
  state = { loading: true, featureProducts: [] },
  action
) => {
  switch (action.type) {
    case HOME_PAGE_PRODUCT_FEATURE_DATA_REQUEST:
      return { loading: true };

    case HOME_PAGE_PRODUCT_FEATURE_DATA_SUCCESS:
      return {
        loading: false,
        success: true,
        featureProducts: action.payload,
      };

    case HOME_PAGE_PRODUCT_FEATURE_DATA_FAIL:
      return { loading: false, featureProducts: action.payload };

    default:
      return state;
  }
};

//Product detail page review reducers
export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_REVIEW_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true, review: action.payload };
    case PRODUCT_REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

//Product detail page QnA reducers
export const productQnACreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_QNA_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_QNA_CREATE_SUCCESS:
      return { loading: false, success: true, qna: action.payload };
    case PRODUCT_QNA_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_QNA_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
