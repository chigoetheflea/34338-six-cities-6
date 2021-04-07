import {ActionType} from '../actions';
import {AuthorizationStatus} from '../../util/const';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  loggedUser: null,
  loginError: false,
  isAuthChecked: false,
};

const user = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case ActionType.SAVE_AUTH_INFO:
      return {
        ...state,
        loggedUser: payload,
        loginError: false,
      };

    case ActionType.REQUEST_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: payload,
      };

    case ActionType.SHOW_LOGIN_ERROR:
      return {
        ...state,
        loginError: true,
      };

    case ActionType.CHECK_AUTH:
      return {
        ...state,
        isAuthChecked: true,
      };
  }

  return state;
};

export {user};
