import {ActionType} from './actions';
import {DEFAULT_CITY} from '../util/const';
import {getFilteredOffersByCity} from '../util/util';
import offers from '../mocks/offers';

const initialState = {
  city: DEFAULT_CITY,
  offers: getFilteredOffersByCity(offers, DEFAULT_CITY),
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
        offers: getFilteredOffersByCity(offers, state.city),
      };
  }

  return state;
};

export {reducer};
