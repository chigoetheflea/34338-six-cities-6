import {ActionType} from './actions';
import {DEFAULT_CITY, DEFAULT_SORTING, AuthorizationStatus, ReviewFormStatus} from '../util/const';
import {getFilteredOffersByCity, getSortedOffers} from '../util/util';

const initialState = {
  isDataLoaded: false,
  isOfferLoaded: false,
  isRelatedLoaded: false,
  isReviewsLoaded: false,
  offers: [],
  filteredOffers: [],
  relatedOffers: [],
  hoveredOffer: null,
  activeOffer: 0,
  loadedOffer: null,
  reviews: [],
  reviewFormStatus: null,
  city: DEFAULT_CITY,
  sorting: DEFAULT_SORTING,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  loggedUser: null,
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

    case ActionType.CHANGE_HOVERED_OFFER:
      return {
        ...state,
        hoveredOffer: payload,
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

    case ActionType.CLEAR_OFFERS:
      return {
        ...state,
        isDataLoaded: false,
      };

    case ActionType.SAVE_AUTH_INFO:
      return {
        ...state,
        loggedUser: payload,
      };

    case ActionType.LOAD_OFFER:
      return {
        ...state,
        loadedOffer: payload,
        isOfferLoaded: true,
      };

    case ActionType.CLEAR_LOADED_OFFER:
      return {
        ...state,
        isOfferLoaded: false,
        isRelatedLoaded: false,
        isReviewsLoaded: false,
      };

    case ActionType.LOAD_RELATED_OFFERS:
      return {
        ...state,
        relatedOffers: payload,
        isRelatedLoaded: true,
      };

    case ActionType.LOAD_REVIEWS:
      return {
        ...state,
        reviews: payload,
        isReviewsLoaded: true,
      };

    case ActionType.RESET_REVIEW_FORM:
      return {
        ...state,
        reviewFormStatus: ReviewFormStatus.SEND,
      };

    case ActionType.SHOW_REVIEW_ERROR:
      return {
        ...state,
        reviewFormStatus: ReviewFormStatus.ERROR,
      };

    case ActionType.CLEAR_REVIEW_FORM_STATUS:
      return {
        ...state,
        reviewFormStatus: null,
      };
  }

  return state;
};

export {reducer};
