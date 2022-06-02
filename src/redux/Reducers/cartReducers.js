import {
  ADD_TO_CART_ITEM,
  ADD_TO_WISHLIST,
  CART_DECREASE,
  CART_EMPTY,
  CART_INCREAGE,
  CART_REMOVE_ITEM,
  WISHLIST_REMOVE_ITEM,
} from "../Constants/addToCartContants";

const getItem = localStorage.getItem("cartItems");

const initialState = {
  cartItem: JSON.parse(getItem) ? JSON.parse(getItem) : [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART_ITEM:
      const item = action.payload;
      const exisItem = state.cartItem.find((x) => x._id === item._id);

      if (exisItem) {
        return {
          ...state,
          cartItem: state.cartItem.map((x) =>
            x._id === exisItem._id ? item : x
          ),
        };
      } else {
        return { ...state, cartItem: [...state.cartItem, item] };
      }

    case CART_INCREAGE:
      const incItem = action.payload;
      return {
        ...state,
        cartItem: state.cartItem.map((x) => {
          if (x._id === incItem._id) {
            x.qty += incItem.inc;
          }
          return x;
        }),
      };

    case CART_DECREASE:
      const decItem = action.payload;

      return {
        ...state,
        cartItem: state.cartItem.map((x) => {
          if (x._id === decItem._id) {
            if (x.qty > x.minimumSell) {
              x.qty -= decItem.dec;
            }
          }
          return x;
        }),
      };

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItem: state.cartItem.filter((x) => x._id !== action.payload),
      };

    case CART_EMPTY:
      return { ...state, cartItem: [] };

    default:
      return state;
  }
};

const initialWistListState = {
  wishListItem: JSON.parse(getItem) ? JSON.parse(getItem) : [],
};
// wist list reducer
export const wistListReducer = (state = initialWistListState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      const wishList = action.payload;
      const exisWishList = state.wishListItem.find(
        (x) => x._id === wishList._id
      );

      if (exisWishList) {
        return {
          ...state,
          wishListItem: state.wishListItem.map((x) =>
            x._id === exisWishList._id ? wishList : x
          ),
        };
      } else {
        return { ...state, wishListItem: [...state.wishListItem, wishList] };
      }

    case WISHLIST_REMOVE_ITEM:
      return {
        ...state,
        wishListItem: state.wishListItem.filter(
          (x) => x._id !== action.payload
        ),
      };

    default:
      return state;
  }
};
