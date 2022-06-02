import {
  All_CONTACT_US_FAIL,
  All_CONTACT_US_REQUEST,
  All_CONTACT_US_SUCCESS,
  CONTACT_US_CREATE_FAIL,
  CONTACT_US_CREATE_REQUEST,
  CONTACT_US_CREATE_RESET,
  CONTACT_US_CREATE_SUCCESS,
  CONTACT_US_DELETE_FAIL,
  CONTACT_US_DELETE_REQUEST,
  CONTACT_US_DELETE_RESET,
  CONTACT_US_DELETE_SUCCESS,
  CONTACT_US_DETAILS_FAIL,
  CONTACT_US_DETAILS_REQUEST,
  CONTACT_US_DETAILS_SUCCESS,
  CONTACT_US_UPDATE_FAIL,
  CONTACT_US_UPDATE_REQUEST,
  CONTACT_US_UPDATE_RESET,
  CONTACT_US_UPDATE_SUCCESS,
} from "../Constants/contactUsConstants";

// get all contact reducers
export const allContactUsReducers = (
  state = { loading: true, allContactUs: [] },
  action
) => {
  switch (action.type) {
    case All_CONTACT_US_REQUEST:
      return { loading: true };

    case All_CONTACT_US_SUCCESS:
      return { loading: false, success: true, allContactUs: action.payload };

    case All_CONTACT_US_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
// create contact us reducers
export const contactUsCreateReducers = (state = {}, action) => {
  switch (action.type) {
    case CONTACT_US_CREATE_REQUEST:
      return { loading: true };
    case CONTACT_US_CREATE_SUCCESS:
      return { loading: false, success: true, contactUsCreate: action.payload };
    case CONTACT_US_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case CONTACT_US_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
// details contact us reducers
export const contactUsDetailsReducers = (
  state = { loading: true, contactUsDetails: [] },
  action
) => {
  switch (action.type) {
    case CONTACT_US_DETAILS_REQUEST:
      return { loadding: true };

    case CONTACT_US_DETAILS_SUCCESS:
      return {
        loadding: false,
        success: true,
        contactUsDetails: action.payload,
      };

    case CONTACT_US_DETAILS_FAIL:
      return { loadding: false, error: action.payload };

    default:
      return state;
  }
};
// update contact us reducers
export const contactUsUpdateReducers = (state = {}, action) => {
  switch (action.type) {
    case CONTACT_US_UPDATE_REQUEST:
      return { loading: true };
    case CONTACT_US_UPDATE_SUCCESS:
      return { loading: false, success: true, contactUsUpdate: action.payload };
    case CONTACT_US_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case CONTACT_US_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
// delete contact us reducers
export const contactUsDeleteReducers = (state = {}, action) => {
  switch (action.type) {
    case CONTACT_US_DELETE_REQUEST:
      return { loading: true };
    case CONTACT_US_DELETE_SUCCESS:
      return { loading: false, success: true, contactUsDelete: action.payload };
    case CONTACT_US_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case CONTACT_US_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
