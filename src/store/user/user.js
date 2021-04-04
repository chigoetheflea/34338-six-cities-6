import {ActionType} from '../actions';
import {AuthorizationStatus} from '../../util/const';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  loggedUser: null,
};

const user = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case ActionType.SAVE_AUTH_INFO:
      return {
        ...state,
        loggedUser: payload,
      };

    case ActionType.REQUEST_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: payload,
      };
  }

  return state;
};

export {user};
