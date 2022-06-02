import {
  CONVERSATION_BYID_FAIL,
  CONVERSATION_BYID_REQUEST,
  CONVERSATION_BYID_SUCCESS,
  CREATE_CONVERSATION_FAIL,
  CREATE_CONVERSATION_REQUEST,
  CREATE_CONVERSATION_RESET,
  CREATE_CONVERSATION_SUCCESS,
  GET_MESSAGES_BY_CONVERSATION_ID_FAIL,
  GET_MESSAGES_BY_CONVERSATION_ID_REQUEST,
  GET_MESSAGES_BY_CONVERSATION_ID_SUCCESS,
} from "../Constants/chatsContants";

//get the use conversation iD

export const conversationMembersReducer = (
  state = { loadding: true, conversations: {} },
  action
) => {
  switch (action.type) {
    case CONVERSATION_BYID_REQUEST:
      return { loadding: true };
    case CONVERSATION_BYID_SUCCESS:
      return { loading: false, conversations: action.payload };

    case CONVERSATION_BYID_FAIL:
      return { loadding: false, error: action.payload };

    default:
      return state;
  }
};

//get the messaes by conversationID

export const MessagesReducer = (
  state = { loading: true, messages: {} },
  action
) => {
  switch (action.type) {
    case GET_MESSAGES_BY_CONVERSATION_ID_REQUEST:
      return { loadding: true };
    case GET_MESSAGES_BY_CONVERSATION_ID_SUCCESS:
      return { loadings: false, messages: action.payload };

    case GET_MESSAGES_BY_CONVERSATION_ID_FAIL:
      return { loadding: false, error: action.payload };

    default:
      return state;
  }
};

//Create chat message reducers

export const messageReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CONVERSATION_REQUEST:
      return { loading: true };
    case CREATE_CONVERSATION_SUCCESS:
      return { loading: false, success: true, ChatMessage: action.payload };
    case CREATE_CONVERSATION_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_CONVERSATION_RESET:
      return {};
    default:
      return state;
  }
};
