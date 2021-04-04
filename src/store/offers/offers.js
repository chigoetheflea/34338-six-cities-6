import {ActionType} from '../actions';
import {DEFAULT_SORTING, DEFAULT_CITY} from '../../util/const';

const initialState = {
  isDataLoaded: false,
  isFavoritesLoaded: false,
  offers: [],
  favorites: [],
  sorting: DEFAULT_SORTING,
  city: DEFAULT_CITY,
};

const offers = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: payload,
      };

    case ActionType.CHANGE_SORTING:
      return {
        ...state,
        sorting: payload,
      };

    case ActionType.LOAD_OFFERS:
      return {
        ...state,
        offers: payload,
        isDataLoaded: true,
      };

    case ActionType.CLEAR_OFFERS:
      return {
        ...state,
        isDataLoaded: false,
      };

    case ActionType.LOAD_FAVORITES:
      return {
        ...state,
        favorites: payload,
        isFavoritesLoaded: true,
      };

    case ActionType.CLEAR_FAVORITES:
      return {
        ...state,
        isFavoritesLoaded: false,
      };
  }

  return state;
};

export {offers};
