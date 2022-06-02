import Axios from "axios";
import {
  ADD_TO_CART_ITEM,
  ADD_TO_WISHLIST,
  CART_DECREASE,
  CART_EMPTY,
  CART_INCREAGE,
  CART_REMOVE_ITEM,
  WISHLIST_REMOVE_ITEM,
} from "../Constants/addToCartContants";

// ADD TO CART
export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(
    `https://nirvoya.herokuapp.com/api/products/${productId}`
  );
  dispatch({
    type: ADD_TO_CART_ITEM,
    payload: {
      _id: data._id,
      name: data.name,
      displayImage: data.displayImage,
      productCode: data.productCode,
      sellPrice: data.sellPrice,
      productDiscountPrice: (data.discount * data.sellPrice) / 100,
      discount: data.discount,
      mainCategory: data.mainCategory[0].mainCategoryName,
      category: data?.category[0] ? data?.category[0]?.categoryName : null,
      subCategory: data?.subCategory[0]
        ? data?.subCategory[0]?.subCategoryName
        : null,
      entrepreneur: data.entrepreneur,
      taxPrice: data.taxPrice,
      minimumSell: data.minimumSell,
      qty: qty,
    },
  });
  localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItem));
};
// CART INCREAGE
export const CartIncreage = (productId, qty) => (dispatch, getState) => {
  const data = { _id: productId, inc: qty };
  dispatch({ type: CART_INCREAGE, payload: data });
  localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItem));
};
// CART DECREASE
export const CartDecrease = (productId, qty) => (dispatch, getState) => {
  const data = { _id: productId, dec: qty };
  dispatch({ type: CART_DECREASE, payload: data });
  localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItem));
};
// CART REMOVE ITEM
export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItem));
};
// CART EMPTY CART
export const emptyCart = (data) => (dispatch, getState) => {
  dispatch({ type: CART_EMPTY, payload: data });
  localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItem));
};
// ADD TO WISH LIST
export const addToWistList = (productId) => async (dispatch, getState) => {
  const { data } = await Axios.get(
    `https://nirvoya.herokuapp.com/api/products/${productId}`
  );
  dispatch({
    type: ADD_TO_WISHLIST,
    payload: {
      _id: data._id,
      name: data.name,
      displayImage: data.displayImage,
      productCode: data.productCode,
      sellPrice: data.sellPrice,
      productDiscountPrice: (data.discount * data.sellPrice) / 100,
      discount: data.discount,
      mainCategory: data.mainCategory[0].mainCategoryName,
      category: data?.category[0] ? data?.category[0]?.categoryName : null,
      subCategory: data?.subCategory[0]
        ? data?.subCategory[0]?.subCategoryName
        : null,
      entrepreneur: data.entrepreneur,
      taxPrice: data.taxPrice,
    },
  });

  localStorage.setItem(
    "wishListItem",
    JSON.stringify(getState().wishList.wishListItem)
  );
};
// CART REMOVE ITEM
export const removeFromwistList = (productId) => (dispatch, getState) => {
  dispatch({ type: WISHLIST_REMOVE_ITEM, payload: productId });
  localStorage.setItem(
    "wishListItem",
    JSON.stringify(getState().wishList.wishListItem)
  );
};
