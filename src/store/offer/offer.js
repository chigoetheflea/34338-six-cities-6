import {ActionType} from '../actions';

const initialState = {
  isOfferLoaded: false,
  isRelatedLoaded: false,
  relatedOffers: [],
  hoveredOffer: null,
  activeOffer: 0,
  loadedOffer: null,
};

const offer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
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
  }

  return state;
};

export {offer};
