import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_BOUNTY,
  UNLIKE_BOUNTY,
  MARK_NOTIFICATIONS_READ,
  CONFIRM_SIGNUP,
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  info: {},
  likes: [],
  notifications: [],
  signupSuccess: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LIKE_BOUNTY:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            bountyId: action.payload.bountyId,
          },
        ],
      };
    case UNLIKE_BOUNTY:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.bountyId !== action.payload.bountyId
        ),
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((notif) => (notif.read = true));
      return {
        ...state,
      };
    case CONFIRM_SIGNUP:
      return {
        ...state,
        signupSuccess: true,
      };
    default:
      return state;
  }
}
