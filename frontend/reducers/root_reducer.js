import { combineReducers } from 'redux'
import errors from './errors_reducer';
import session from './session_reducer';
import modal from './modal_reducer';
import userInView from './user_in_view_reducer';

const rootReducer = combineReducers({
  errors,
  session,
  modal,
  userInView
});

export default rootReducer;
