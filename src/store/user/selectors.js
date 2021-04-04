import {NameSpace} from '../root-reducer';

const getLoggedUser = (state) => state[NameSpace.USER].loggedUser;

const getAuthorizationStatus = (state) => state[NameSpace.USER].authorizationStatus;

export {
  getLoggedUser,
  getAuthorizationStatus,
};
