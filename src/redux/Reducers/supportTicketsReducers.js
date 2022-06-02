import {
  ALL_SUPPORT_TICKETS_FAIL,
  ALL_SUPPORT_TICKETS_REQUEST,
  ALL_SUPPORT_TICKETS_SUCCESS,
  SUPPORT_TICKETS_ADMIN_FAIL,
  SUPPORT_TICKETS_ADMIN_REQUEST,
  SUPPORT_TICKETS_ADMIN_RESET,
  SUPPORT_TICKETS_ADMIN_SUCCESS,
  SUPPORT_TICKETS_CREATE_FAIL,
  SUPPORT_TICKETS_CREATE_REQUEST,
  SUPPORT_TICKETS_CREATE_RESET,
  SUPPORT_TICKETS_CREATE_SUCCESS,
  SUPPORT_TICKETS_DELETE_FAIL,
  SUPPORT_TICKETS_DELETE_REQUEST,
  SUPPORT_TICKETS_DELETE_RESET,
  SUPPORT_TICKETS_DELETE_SUCCESS,
  SUPPORT_TICKETS_DETAILS_FAIL,
  SUPPORT_TICKETS_DETAILS_REQUEST,
  SUPPORT_TICKETS_DETAILS_SUCCESS,
  SUPPORT_TICKETS_RECOMMENT_FAIL,
  SUPPORT_TICKETS_RECOMMENT_REQUEST,
  SUPPORT_TICKETS_RECOMMENT_RESET,
  SUPPORT_TICKETS_RECOMMENT_SUCCESS,
  SUPPORT_TICKETS_UPDATE_FAIL,
  SUPPORT_TICKETS_UPDATE_REQUEST,
  SUPPORT_TICKETS_UPDATE_RESET,
  SUPPORT_TICKETS_UPDATE_SUCCESS,
} from "../Constants/supportTicketConstants";

// get all support ticket reducers
export const supportTicketReducers = (
  state = { loading: true, supportTickets: [] },
  action
) => {
  switch (action.type) {
    case ALL_SUPPORT_TICKETS_REQUEST:
      return { loading: true };
    case ALL_SUPPORT_TICKETS_SUCCESS:
      return { loading: false, success: true, supportTickets: action.payload };
    case ALL_SUPPORT_TICKETS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// support ticket create reducers
export const supportTicketCreateReducers = (state = {}, action) => {
  switch (action.type) {
    case SUPPORT_TICKETS_CREATE_REQUEST:
      return { loading: true };
    case SUPPORT_TICKETS_CREATE_SUCCESS:
      return {
        loading: true,
        success: true,
        supportTicketCreate: action.payload,
      };
    case SUPPORT_TICKETS_CREATE_FAIL:
      return { loading: true, error: action.payload };
    case SUPPORT_TICKETS_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
// tickets create details reducers
export const supportTicketDetailsReducers = (
  state = { loading: true, supportTicketDetails: [] },
  action
) => {
  switch (action.type) {
    case SUPPORT_TICKETS_DETAILS_REQUEST:
      return { loading: true };
    case SUPPORT_TICKETS_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        supportTicketDetails: action.payload,
      };
    case SUPPORT_TICKETS_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// support tickets update reducers
export const supportTicketUpdateReducers = (state = {}, action) => {
  switch (action.type) {
    case SUPPORT_TICKETS_UPDATE_REQUEST:
      return { loading: true };
    case SUPPORT_TICKETS_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        supportTicketUpdate: action.payload,
      };
    case SUPPORT_TICKETS_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SUPPORT_TICKETS_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

//recomment support tickets
export const recommentSupportTicketReducers = (state = {}, action) => {
  switch (action.type) {
    case SUPPORT_TICKETS_RECOMMENT_REQUEST:
      return { loading: true };
    case SUPPORT_TICKETS_RECOMMENT_SUCCESS:
      return {
        loading: false,
        success: true,
        supportTicketRecommented: action.payload,
      };
    case SUPPORT_TICKETS_RECOMMENT_FAIL:
      return { loading: false, error: action.payload };
    case SUPPORT_TICKETS_RECOMMENT_RESET:
      return {};
    default:
      return state;
  }
};

//Admin Support Ticket
export const adminSupportTicketReducers = (state = {}, action) => {
  switch (action.type) {
    case SUPPORT_TICKETS_ADMIN_REQUEST:
      return { loading: true };
    case SUPPORT_TICKETS_ADMIN_SUCCESS:
      return {
        loading: false,
        success: true,
        amdinTicket: action.payload,
      };
    case SUPPORT_TICKETS_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    case SUPPORT_TICKETS_ADMIN_RESET:
      return {};
    default:
      return state;
  }
};

// support ticket delete reducers
export const supportTicketDeleteReducers = (state = {}, action) => {
  switch (action.type) {
    case SUPPORT_TICKETS_DELETE_REQUEST:
      return { loading: true };
    case SUPPORT_TICKETS_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        supportTicketDelete: action.payload,
      };
    case SUPPORT_TICKETS_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case SUPPORT_TICKETS_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
