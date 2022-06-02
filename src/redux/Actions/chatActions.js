import Axios from "axios";
import {
  CONVERSATION_BYID_FAIL,
  CONVERSATION_BYID_REQUEST,
  CONVERSATION_BYID_SUCCESS,
  CREATE_CONVERSATION_FAIL,
  CREATE_CONVERSATION_REQUEST,
  CREATE_CONVERSATION_SUCCESS,
  GET_MESSAGES_BY_CONVERSATION_ID_FAIL,
  GET_MESSAGES_BY_CONVERSATION_ID_REQUEST,
  GET_MESSAGES_BY_CONVERSATION_ID_SUCCESS,
} from "../Constants/chatsContants";

//Conversation IDS by userId
export const conversationMember = (user) => async (dispatch) => {
  dispatch({
    type: CONVERSATION_BYID_REQUEST,
    payload: user,
  });

  try {
    const { data } = await Axios.get(
      `https://nirvoya.herokuapp.com/api/conversation/${user}`
    );
    dispatch({
      type: CONVERSATION_BYID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONVERSATION_BYID_FAIL,
      payload: { message: error.message },
    });
  }
};

//Conversation detail by conversationId
export const conversationMessages = (conversationId) => async (dispatch) => {
  dispatch({
    type: GET_MESSAGES_BY_CONVERSATION_ID_REQUEST,
    payload: conversationId,
  });

  try {
    const { data } = await Axios.get(
      `https://nirvoya.herokuapp.com/api/message/${conversationId}`
    );
    dispatch({
      type: GET_MESSAGES_BY_CONVERSATION_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_MESSAGES_BY_CONVERSATION_ID_FAIL,
      payload: { message: error.message },
    });
  }
};

//create chat conversation

export const createChatConversation = (message) => async (dispatch) => {
  dispatch({
    type: CREATE_CONVERSATION_REQUEST,
    payload: { message },
  });

  try {
    const { data } = await Axios.post(
      "https://nirvoya.herokuapp.com/api/message",
      message
    );
    dispatch({
      type: CREATE_CONVERSATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CREATE_CONVERSATION_FAIL, payload: message });
  }
};
