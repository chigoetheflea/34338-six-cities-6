import {ActionType} from '../actions';
import {adaptOffersToClient, adaptOfferToClient, getRandomArrayElements} from '../../util/util';

const MAX_RELATED_COUNT = 3;

export const getAdaptedOffers = () => (next) => (action) => {
  const isOffersLoadingAction = action.type === ActionType.LOAD_OFFERS || action.type === ActionType.LOAD_RELATED_OFFERS;

  if (isOffersLoadingAction) {
    action.payload = adaptOffersToClient(action.payload);
  }

  if (action.type === ActionType.LOAD_RELATED_OFFERS) {
    action.payload = getRandomArrayElements(action.payload, MAX_RELATED_COUNT);
  }

  if (action.type === ActionType.LOAD_OFFER) {
    action.payload = adaptOfferToClient(action.payload);
  }

  return next(action);
};
