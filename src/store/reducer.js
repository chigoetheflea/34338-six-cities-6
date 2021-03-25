import {ActionType} from './actions';
import {DEFAULT_CITY, DEFAULT_SORTING, AuthorizationStatus} from '../util/const';
import {getFilteredOffersByCity, getSortedOffers} from '../util/util';

const initialState = {
  city: DEFAULT_CITY,
  sorting: DEFAULT_SORTING,
  offers: [],
  filteredOffers: [],
  activeOffer: null,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  isDataLoaded: false,
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
        filteredOffers: getSortedOffers(getFilteredOffersByCity(state.offers, state.city), state.sorting),
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

    case ActionType.REQUEST_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: payload,
      };

    case ActionType.LOAD_OFFERS:
      return {
        ...state,
        offers: payload,
        isDataLoaded: true,
      };
  }

  return state;
};

export {reducer};
