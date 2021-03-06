import { RECEIVE_SESSION_ERRORS } from '../actions/session_actions';
import { RECEIVE_USER_ERRORS } from '../actions/user_actions';
import { RECEIVE_TRACK_ERRORS } from '../actions/track_actions';
import { RECEIVE_COMMENT_ERRORS } from '../actions/comment_actions';
import { CLEAR_ERRORS } from '../actions/errors_actions';

const defaultState = {
  session: {},
  user: {},
  track: {},
  comment: {}
};

const errorsReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_SESSION_ERRORS:
      return Object.assign({}, state, {session: action.errors});
    case RECEIVE_USER_ERRORS:
      return Object.assign({}, state, {user: action.errors});
    case RECEIVE_TRACK_ERRORS:
      return Object.assign({}, state, {track: action.errors});
    case RECEIVE_COMMENT_ERRORS:
      return Object.assign({}, state, {comment: action.errors});
    case CLEAR_ERRORS:
      return defaultState;
    default:
      return state;
  };
};

export default errorsReducer;
