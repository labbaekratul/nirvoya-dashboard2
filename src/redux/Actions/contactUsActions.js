import Axios from "axios";
import {
  All_CONTACT_US_FAIL,
  All_CONTACT_US_REQUEST,
  All_CONTACT_US_SUCCESS,
  CONTACT_US_CREATE_FAIL,
  CONTACT_US_CREATE_REQUEST,
  CONTACT_US_CREATE_SUCCESS,
  CONTACT_US_DELETE_FAIL,
  CONTACT_US_DELETE_REQUEST,
  CONTACT_US_DELETE_SUCCESS,
  CONTACT_US_DETAILS_FAIL,
  CONTACT_US_DETAILS_REQUEST,
  CONTACT_US_DETAILS_SUCCESS,
  CONTACT_US_UPDATE_FAIL,
  CONTACT_US_UPDATE_REQUEST,
  CONTACT_US_UPDATE_SUCCESS,
} from "../Constants/contactUsConstants";

// get all contact us
export const getContactUs = () => async (dispatch) => {
  dispatch({
    type: All_CONTACT_US_REQUEST,
  });

  try {
    const { data } = await Axios.get(
      "https://nirvoya.herokuapp.com/api/contact"
    );
    dispatch({
      type: All_CONTACT_US_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: All_CONTACT_US_FAIL,
      payload: { message: error.message },
    });
  }
};

// contact us create
export const createContactUs = (contact) => async (dispatch) => {
  dispatch({
    type: CONTACT_US_CREATE_REQUEST,
    payload: { contact },
  });

  const { data } = await Axios.post(
    "https://nirvoya.herokuapp.com/api/contact",
    contact
  );
  try {
    dispatch({
      type: CONTACT_US_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CONTACT_US_CREATE_FAIL, payload: message });
  }
};

// contact us single
export const editContactUs = (id) => async (dispatch) => {
  dispatch({
    type: CONTACT_US_DETAILS_REQUEST,
    payload: id,
  });

  const { data } = await Axios.get(
    `https://nirvoya.herokuapp.com/api/contact/${id}`
  );
  try {
    dispatch({
      type: CONTACT_US_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONTACT_US_DETAILS_FAIL,
      payload: { message: error.message },
    });
  }
};

// contact us update
export const updateContactUs = (contactData) => async (dispatch) => {
  dispatch({
    type: CONTACT_US_UPDATE_REQUEST,
    payload: contactData,
  });

  const { data } = await Axios.put(
    `https://nirvoya.herokuapp.com/api/contact/${contactData._id}`,
    contactData
  );

  try {
    dispatch({
      type: CONTACT_US_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CONTACT_US_UPDATE_FAIL,
      message: message,
    });
  }
};

// contact us delete
export const deleteContactUs = (contactId) => async (dispatch) => {
  dispatch({ type: CONTACT_US_DELETE_REQUEST, payload: contactId });

  const { data } = await Axios.delete(
    `https://nirvoya.herokuapp.com/api/contact/${contactId}`
  );
  try {
    dispatch({
      type: CONTACT_US_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CONTACT_US_DELETE_FAIL, payload: message });
  }
};
