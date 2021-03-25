import {ActionType} from '../actions';
import {adaptOffersToClient} from '../../util/util';

export const getAdaptedOffers = () => (next) => (action) => {
  if (action.type === ActionType.LOAD_OFFERS) {
    action.payload = adaptOffersToClient(action.payload);
  }

  return next(action);
};
