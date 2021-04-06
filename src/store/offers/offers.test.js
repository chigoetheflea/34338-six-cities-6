import MockAdapter from 'axios-mock-adapter';
import {createApi} from '../../services/api';

import {offers} from './offers';
import {ActionType} from '../actions';
import {fetchOffersList, fetchFavoritesList} from '../../store/api-actions';
import {DEFAULT_SORTING, DEFAULT_CITY, Path} from '../../util/const';

const api = createApi(() => {});

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

describe(`Offers reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    const initialState = {
      isDataLoaded: false,
      isFavoritesLoaded: false,
      offers: [],
      favorites: [],
      sorting: DEFAULT_SORTING,
      city: DEFAULT_CITY,
    };

    expect(offers(undefined, {})).toEqual(initialState);
  });

  it(`Reducer should return new city`, () => {
    const initialState = {
      city: DEFAULT_CITY,
    };

    const simpleCity = `Amsterdam`;

    const expected = {
      city: simpleCity,
    };

    const changeCityAction = {
      type: ActionType.CHANGE_CITY,
      payload: simpleCity,
    };

    expect(offers(initialState, changeCityAction)).toEqual(expected);
  });

  it(`Reducer should return new sorting`, () => {
    const initialState = {
      sorting: DEFAULT_SORTING,
    };

    const simpleSorting = `By price`;

    const expected = {
      sorting: simpleSorting,
    };

    const changeSortingAction = {
      type: ActionType.CHANGE_SORTING,
      payload: simpleSorting,
    };

    expect(offers(initialState, changeSortingAction)).toEqual(expected);
  });

  it(`Reducer should return loaded offers' flag`, () => {
    const initialState = {
      isDataLoaded: false,
      offers: [],
    };

    const expected = {
      isDataLoaded: true,
      offers: simpleOffers,
    };

    const loadOffersAction = {
      type: ActionType.LOAD_OFFERS,
      payload: simpleOffers,
    };

    expect(offers(initialState, loadOffersAction)).toEqual(expected);
  });

  it(`Reducer should reset loaded offers' flag`, () => {
    const initialState = {
      isDataLoaded: true,
      offers: simpleOffers,
    };

    const expected = {
      isDataLoaded: false,
      offers: simpleOffers,
    };

    const clearOffersAction = {
      type: ActionType.CLEAR_OFFERS,
    };

    expect(offers(initialState, clearOffersAction)).toEqual(expected);
  });

  it(`Reducer should return loaded favorite offers' flag`, () => {
    const initialState = {
      isFavoritesLoaded: false,
      favorites: [],
    };

    const expected = {
      isFavoritesLoaded: true,
      favorites: simpleOffers,
    };

    const loadFavoritesAction = {
      type: ActionType.LOAD_FAVORITES,
      payload: simpleOffers,
    };

    expect(offers(initialState, loadFavoritesAction)).toEqual(expected);
  });

  it(`Reducer should reset loaded favorite offers' flag`, () => {
    const initialState = {
      isFavoritesLoaded: true,
      favorites: simpleOffers,
    };

    const expected = {
      isFavoritesLoaded: false,
      favorites: simpleOffers,
    };

    const clearFavoriteOffersAction = {
      type: ActionType.CLEAR_FAVORITES,
    };

    expect(offers(initialState, clearFavoriteOffersAction)).toEqual(expected);
  });
});

describe(`Async operations works correctly`, () => {
  it(`Should make a correct API call to /hotels`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = fetchOffersList();

    apiMock
      .onGet(Path.OFFERS)
      .reply(200, simpleOffers);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: simpleOffers,
        });
      });
  });

  it(`Should make a correct API call to /favorite`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = fetchFavoritesList();

    apiMock
      .onGet(Path.FAVORITE)
      .reply(200, simpleOffers);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITES,
          payload: simpleOffers,
        });
      });
  });
});
