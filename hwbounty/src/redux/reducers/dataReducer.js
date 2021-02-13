import {
  SET_BOUNTIES,
  LIKE_BOUNTY,
  UNLIKE_BOUNTY,
  LOADING_DATA,
  DELETE_BOUNTY,
  POST_BOUNTY,
  SET_BOUNTY,
  SUBMIT_COMMENT,
} from "../types";

const initialState = {
  bounties: [],
  bounty: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_BOUNTIES:
      return {
        ...state,
        bounties: action.payload,
        loading: false,
      };
    case SET_BOUNTY:
      return {
        ...state,
        bounty: action.payload,
      };
    case LIKE_BOUNTY:
    case UNLIKE_BOUNTY:
      let index = state.bounties.findIndex(
        (bounty) => bounty.bountyId === action.payload.bountyId
      );
      state.bounties[index] = action.payload;
      if (state.bounty.bountyId === action.payload.bountyId) {
        state.bounty = action.payload;
      }
      return {
        ...state,
      };
    case DELETE_BOUNTY:
      let deleteIndex = state.bounties.findIndex(
        (bounty) => bounty.bountyId === action.payload
      );
      state.bounties.splice(deleteIndex, 1);
      return {
        ...state,
      };
    case POST_BOUNTY:
      return {
        ...state,
        bounties: [action.payload, ...state.bounties],
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        bounty: {
          ...state.bounty,
          comments: [action.payload, ...state.bounty.comments],
        },
      };
    default:
      return state;
  }
}
