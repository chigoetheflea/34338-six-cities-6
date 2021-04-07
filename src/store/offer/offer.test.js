import MockAdapter from 'axios-mock-adapter';
import {createApi} from '../../services/api';

import {offer} from './offer';
import {ActionType} from '../actions';
import {fetchOffer, fetchRelatedOffers, manageFavorite} from '../../store/api-actions';
import {Path} from '../../util/const';

const api = createApi(() => {}, () => {});

const SIMPLE_OFFER_ID = 10;

const simpleOffer = {
  bedrooms: 3,
  city: {
    location: {
      latitude: 52.38333,
      longitude: 4.9,
      zoom: 10
    },
    name: `Amsterdam`
  },
  description: `1. A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  host: {
    avatarUrl: ``,
    id: 3,
    isPro: true,
    name: `Angelina`
  },
  id: 1,
  images: [`img1`, `img2`],
  isFavorite: true,
  isPremium: false,
  location: {
    latitude: 52.3909553943508,
    longitude: 4.85309666406198,
    zoom: 8
  },
  maxAdults: 4,
  previewImage: ``,
  price: 100,
  rating: 4,
  title: `Beautiful & luxurious studio at great location`,
  type: `apartment`
};

const simpleOffers = [
  {...simpleOffer},
  {
    ...simpleOffer,
    id: 2,
  },
];

describe(`Offer reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    const initialState = {
      isOfferLoaded: false,
      isRelatedLoaded: false,
      relatedOffers: [],
      hoveredOffer: null,
      activeOffer: null,
      loadedOffer: null,
    };

    expect(offer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer should return new hovered offer' id`, () => {
    const initialState = {
      hoveredOffer: null,
    };

    const expected = {
      hoveredOffer: SIMPLE_OFFER_ID,
    };

    const changeHoveredAction = {
      type: ActionType.CHANGE_HOVERED_OFFER,
      payload: SIMPLE_OFFER_ID,
    };

    expect(offer(initialState, changeHoveredAction)).toEqual(expected);
  });

  it(`Reducer should return new active offer' id`, () => {
    const initialState = {
      activeOffer: null,
    };

    const expected = {
      activeOffer: SIMPLE_OFFER_ID,
    };

    const changeActiveAction = {
      type: ActionType.CHANGE_ACTIVE_OFFER,
      payload: SIMPLE_OFFER_ID,
    };

    expect(offer(initialState, changeActiveAction)).toEqual(expected);
  });

  it(`Reducer should return loaded offer' flag`, () => {
    const initialState = {
      loadedOffer: null,
      isOfferLoaded: false,
    };

    const expected = {
      loadedOffer: simpleOffer,
      isOfferLoaded: true,
    };

    const loadOfferAction = {
      type: ActionType.LOAD_OFFER,
      payload: simpleOffer,
    };

    expect(offer(initialState, loadOfferAction)).toEqual(expected);
  });

  it(`Reducer should clear loaded offer' flag`, () => {
    const initialState = {
      isOfferLoaded: true,
      isRelatedLoaded: true,
      isReviewsLoaded: true,
    };

    const expected = {
      isOfferLoaded: false,
      isRelatedLoaded: false,
      isReviewsLoaded: false,
    };

    const clearOfferAction = {
      type: ActionType.CLEAR_LOADED_OFFER,
    };

    expect(offer(initialState, clearOfferAction)).toEqual(expected);
  });

  it(`Reducer should return loaded related offers' flag`, () => {
    const initialState = {
      isRelatedLoaded: false,
      relatedOffers: [],
    };

    const expected = {
      isRelatedLoaded: true,
      relatedOffers: simpleOffers,
    };

    const loadRelatedOfferAction = {
      type: ActionType.LOAD_RELATED_OFFERS,
      payload: simpleOffers,
    };

    expect(offer(initialState, loadRelatedOfferAction)).toEqual(expected);
  });
});

describe(`Async operations works correctly`, () => {
  it(`Should make a correct API call to /hotel/:id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offerLoader = fetchOffer(SIMPLE_OFFER_ID);

    apiMock
      .onGet(`${Path.OFFERS}/${SIMPLE_OFFER_ID}`)
      .reply(200, simpleOffer);

    return offerLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFER,
          payload: simpleOffer,
        });
      });
  });

  it(`Should make a correct API call to /hotels/:hotel_id/nearby`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const relatedLoader = fetchRelatedOffers(SIMPLE_OFFER_ID);

    apiMock
      .onGet(`${Path.OFFERS}/${SIMPLE_OFFER_ID}/nearby`)
      .reply(200, simpleOffers);

    return relatedLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_RELATED_OFFERS,
          payload: simpleOffers,
        });
      });
  });

  it(`Should make a correct API call to /favorite/:hotel_id/:status (add)`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoriteLoader = manageFavorite(SIMPLE_OFFER_ID, true);

    apiMock
      .onPost(`${Path.FAVORITE}/${SIMPLE_OFFER_ID}/1`)
      .reply(200, simpleOffer);

    return favoriteLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFER,
          payload: simpleOffer,
        });
      });
  });

  it(`Should make a correct API call to /favorite/:hotel_id/:status (delete)`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoriteLoader = manageFavorite(SIMPLE_OFFER_ID, false);

    apiMock
      .onPost(`${Path.FAVORITE}/${SIMPLE_OFFER_ID}/0`)
      .reply(200, simpleOffer);

    return favoriteLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFER,
          payload: simpleOffer,
        });
      });
  });
});
