import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {
  adminCreateReducers,
  adminDeleteReducers,
  adminDetailsReducers,
  adminSigninReducer,
  adminsReducers,
  adminUpdateReducers,
} from "./Reducers/adminReducers";
import {
  bannerCreateReducer,
  bannerDeleteReducer,
  bannerDetailsReducer,
  bannerReducers,
  bannerUpdateReducer,
} from "./Reducers/bannerReducers";
import {
  blogCreateReducers,
  blogDeleteReducers,
  blogDetailsReducers,
  blogsReducers,
  blogUpdateReducers,
} from "./Reducers/blogReducers";
import { cartReducer, wistListReducer } from "./Reducers/cartReducers";
import {
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryDetailsReducer,
  categoryReducers,
  categoryUpdateReducer,
  childCategoryReducer,
  homeCategoryReducers,
  subChildCategoryReducer,
} from "./Reducers/categoryReducers";
import {
  conversationMembersReducer,
  messageReducer,
  MessagesReducer,
} from "./Reducers/chatReducers";
import {
  colorCreateReducer,
  colorDeleteReducer,
  colorDetailsReducer,
  colorReducers,
  colorUpdateReducer,
} from "./Reducers/colorReducers";
import {
  allContactUsReducers,
  contactUsCreateReducers,
  contactUsDeleteReducers,
  contactUsDetailsReducers,
  contactUsUpdateReducers,
} from "./Reducers/contactUsReducers";
import {
  entrepreneursCreateReducers,
  entrepreneursDeleteReducers,
  entrepreneursEditReducers,
  entrepreneursReducers,
  entrepreneursUpdateReducers,
} from "./Reducers/entrepreneursReducers";
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderDetailsReducer,
  ordersReducers,
  orderUpdateReducer,
  userOrdersReducer,
} from "./Reducers/orderReducers";
import {
  homePageProductCategoryReducer,
  homePageProductFeatureReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productQnACreateReducer,
  productReducers,
  productReviewCreateReducer,
  productUpdateReducer,
  wishListAddReducer,
  wishListRemoveReducer,
} from "./Reducers/productReducers";
import {
  editSizeReducers,
  sizeCreateReducers,
  sizeDeleteReducers,
  sizesReducers,
  updateSizeReducers,
} from "./Reducers/sizeReducers";
import {
  adminSupportTicketReducers,
  recommentSupportTicketReducers,
  supportTicketCreateReducers,
  supportTicketDeleteReducers,
  supportTicketDetailsReducers,
  supportTicketReducers,
  supportTicketUpdateReducers,
} from "./Reducers/supportTicketsReducers";
import {
  googleRegisterReducer,
  googleSigninReducer,
  googleUserDetailsReducer,
  googleUsersReducer,
  userDeleteReducers,
  userDetailsReducer,
  userRegisterReducer,
  userSigninReducer,
  usersReducer,
  userUpdateReducers,
} from "./Reducers/userAuthReducers";

const reducer = combineReducers({
  // cart
  cart: cartReducer,
  wishList: wistListReducer,
  // product
  products: productReducers,
  productDetail: productDetailsReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  homePageProductCategory: homePageProductCategoryReducer,
  homePageProductFeature: homePageProductFeatureReducer,
  productReviewCreate: productReviewCreateReducer,
  productQnACreate: productQnACreateReducer,
  addWishList: wishListAddReducer,
  removeWishList: wishListRemoveReducer,
  // user
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  users: usersReducer,
  userDetails: userDetailsReducer,
  userDelete: userDeleteReducers,
  userUpdate: userUpdateReducers,

  // google user
  googleUser: googleUserDetailsReducer,
  googleUsers: googleUsersReducer,
  googleSignin: googleSigninReducer,
  googleRegister: googleRegisterReducer,

  //category reducers
  category: categoryReducers,
  categoryCreate: categoryCreateReducer,
  categoryDelete: categoryDeleteReducer,
  categoryDetails: categoryDetailsReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryHome: homeCategoryReducers,
  chaildCategory: childCategoryReducer,
  subChildCategory: subChildCategoryReducer,
  //color reducers
  colors: colorReducers,
  colorCreate: colorCreateReducer,
  colorDelete: colorDeleteReducer,
  colorUpdate: colorUpdateReducer,
  colorDetails: colorDetailsReducer,
  // size reducer
  sizes: sizesReducers,
  sizeCreate: sizeCreateReducers,
  sizeDelete: sizeDeleteReducers,
  sizeEdit: editSizeReducers,
  sizeUpdate: updateSizeReducers,
  // entrepreneur
  entrepreneurs: entrepreneursReducers,
  entrepreneursCreate: entrepreneursCreateReducers,
  entrepreneursEdit: entrepreneursEditReducers,
  entrepreneursUpdate: entrepreneursUpdateReducers,
  entrepreneursDelete: entrepreneursDeleteReducers,
  // blog
  blogs: blogsReducers,
  blogCreate: blogCreateReducers,
  blogDetails: blogDetailsReducers,
  blogUpdate: blogUpdateReducers,
  blogDelete: blogDeleteReducers,
  // banner
  banners: bannerReducers,
  bannerDetails: bannerDetailsReducer,
  bannerCreate: bannerCreateReducer,
  bannerUpdate: bannerUpdateReducer,
  bannerDelete: bannerDeleteReducer,
  //order reducers
  orders: ordersReducers,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderUpdate: orderUpdateReducer,
  orderDelete: orderDeleteReducer,
  userOrders: userOrdersReducer,
  // support tickets
  supportTickets: supportTicketReducers,
  supportTicketCreate: supportTicketCreateReducers,
  supportTicketDetails: supportTicketDetailsReducers,
  supportTicketUpdate: supportTicketUpdateReducers,
  supportTicketDelete: supportTicketDeleteReducers,
  recommentSupport: recommentSupportTicketReducers,
  adminTicket: adminSupportTicketReducers,
  // contact us
  allContactUs: allContactUsReducers,
  contactUsDetails: contactUsDetailsReducers,
  contactUsCreate: contactUsCreateReducers,
  contactUsUpdate: contactUsUpdateReducers,
  contactUsDelete: contactUsDeleteReducers,
  // admin
  admins: adminsReducers,
  adminCreate: adminCreateReducers,
  adminDetails: adminDetailsReducers,
  adminUpdate: adminUpdateReducers,
  adminDelete: adminDeleteReducers,
  adminSignin: adminSigninReducer,
  //chat
  conversationMembers: conversationMembersReducer,
  MessagesWithUsers: MessagesReducer,
  chatConversation: messageReducer,
  //set displayImg
});

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  googleSignin: {
    googleUserInfo: localStorage.getItem("googleUserInfo")
      ? JSON.parse(localStorage.getItem("googleUserInfo"))
      : null,
  },
  adminSignin: {
    adminInfo: localStorage.getItem("adminInfo")
      ? JSON.parse(localStorage.getItem("adminInfo"))
      : null,
  },
  cart: {
    cartItem: JSON.parse(localStorage.getItem("cartItem"))
      ? JSON.parse(localStorage.getItem("cartItem"))
      : [],
  },
  wishList: {
    wishListItem: JSON.parse(localStorage.getItem("wishListItem"))
      ? JSON.parse(localStorage.getItem("wishListItem"))
      : [],
  },
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
