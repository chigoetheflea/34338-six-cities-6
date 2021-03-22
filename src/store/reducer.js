import {ActionType} from './actions';
import {DEFAULT_CITY, DEFAULT_SORTING} from '../util/const';
import {getFilteredOffersByCity, getSortedOffers} from '../util/util';
import offers from '../mocks/offers';

const initialState = {
  city: DEFAULT_CITY,
  sorting: DEFAULT_SORTING,
  offers: getFilteredOffersByCity(offers, DEFAULT_CITY),
  activeOffer: null,
};

const reducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: payload,
      };

    case ActionType.GET_OFFERS:
      return {
        ...state,
        offers: getSortedOffers(getFilteredOffersByCity(offers, state.city), state.sorting),
      };

    case ActionType.CHANGE_SORTING:
      return {
        ...state,
        sorting: payload,
      };

    case ActionType.CHANGE_ACTIVE_OFFER:
      return {
        ...state,
        activeOffer: payload,
      };
  }

  return state;
};

export {reducer};
