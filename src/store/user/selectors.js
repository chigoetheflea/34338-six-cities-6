import {NameSpace} from '../root-reducer';

const getLoggedUser = (state) => state[NameSpace.USER].loggedUser;

const getAuthorizationStatus = (state) => state[NameSpace.USER].authorizationStatus;

const getLoginError = (state) => state[NameSpace.USER].loginError;

const getAuthCheckStatus = (state) => state[NameSpace.USER].isAuthChecked;

export {
  getLoggedUser,
  getAuthorizationStatus,
  getLoginError,
  getAuthCheckStatus,
};
