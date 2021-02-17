import {
  SET_BOUNTIES,
  LOADING_DATA,
  LIKE_BOUNTY,
  UNLIKE_BOUNTY,
  DELETE_BOUNTY,
  POST_BOUNTY,
  CLEAR_ERRORS,
  SET_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_BOUNTY,
  SUBMIT_COMMENT,
} from "../types";
import axios from "axios";

// Get all bounties
export const getBounties = (filter) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/fetchbounties/" + filter)
    .then((res) => {
      dispatch({
        type: SET_BOUNTIES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_BOUNTIES,
        payload: [],
      });
    });
};

export const getBounty = (bountyID) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/bounty/${bountyID}`)
    .then((res) => {
      dispatch({
        type: SET_BOUNTY,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

//Post a bounty
export const postBounty = (newBounty) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/bounty", newBounty)
    .then((res) => {
      console.log("we posted it");
      dispatch({
        type: POST_BOUNTY,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      console.log("errors");
      dispatch({
        type: SET_ERRORS,
        payload: err.response,
      });
    });
};

// Like a bounty
export const likeBounty = (bountyId) => (dispatch) => {
  axios
    .get(`/bounty/${bountyId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_BOUNTY,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// Unlike a bounty
export const unlikeBounty = (bountyId) => (dispatch) => {
  axios
    .get(`/bounty/${bountyId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_BOUNTY,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// Submit a comment
export const submitComment = (bountyId, commentData) => (dispatch) => {
  axios
    .post(`/comment/${bountyId}`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const deleteBounty = (bountyId) => (dispatch) => {
  axios
    .delete(`/bounty/${bountyId}`)
    .then(() => {
      dispatch({ type: DELETE_BOUNTY, payload: bountyId });
    })
    .catch((err) => console.log(err));
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({ type: SET_BOUNTIES, payload: res.data.bounties });
    })
    .catch(() => {
      dispatch({ type: SET_BOUNTIES, payload: null });
    });
};
