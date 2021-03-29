import {ActionType} from '../actions';
import {adaptUserToClient} from '../../util/util';

export const getAdaptedUserInfo = () => (next) => (action) => {
  if (action.type === ActionType.SAVE_AUTH_INFO) {
    action.payload = adaptUserToClient(action.payload);
  }

  return next(action);
};
