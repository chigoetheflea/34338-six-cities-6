import {
  ActionType,
  changeCity,
  changeSorting,
  changeHoveredOffer,
  changeActiveOffer,
  requestAuthorization,
  loadOffers,
  loadFavorites,
  clearFavorites,
  clearOffers,
  saveAuthInfo,
  loadOffer,
  clearLoadedOffer,
  loadRelatedOffers,
  loadReviews,
  resetReviewForm,
  showReviewError,
  clearReviewFormStatus,
} from './actions';

import {AuthorizationStatus} from '../util/const';

const SIMPLE_ID = 3;

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

const simpleReviews = [
  {
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    date: `2019-05-01T14:13:56.569Z`,
    id: 1,
    rating: 4,
    user: {
      avatarUrl: ``,
      id: 1,
      isPro: false,
      name: `Max`
    }
  },
  {
    comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    date: `2020-12-08T14:13:56.569Z`,
    id: 2,
    rating: 3,
    user: {
      avatarUrl: ``,
      id: 2,
      isPro: false,
      name: `Bob`
    }
  },
];

describe(`Actions creators work correctly`, () => {
  it(`Action creator for changing city works`, () => {
    const simpleCity = {
      name: `Amsterdam`,
      location: {
        latitude: 48.856663,
        longitude: 2.351556,
        zoom: 10,
      },
    };

    const expected = {
      type: ActionType.CHANGE_CITY,
      payload: simpleCity,
    };

    expect(changeCity(simpleCity)).toEqual(expected);
  });

  it(`Action creator for changing sorting works`, () => {
    const simpleSorting = `Popular`;

    const expected = {
      type: ActionType.CHANGE_SORTING,
      payload: simpleSorting,
    };

    expect(changeSorting(simpleSorting)).toEqual(expected);
  });

  it(`Action creator for hovered offer changing works`, () => {
    const expected = {
      type: ActionType.CHANGE_HOVERED_OFFER,
      payload: SIMPLE_ID,
    };

    expect(changeHoveredOffer(SIMPLE_ID)).toEqual(expected);
  });

  it(`Action creator for active offer changing works`, () => {
    const expected = {
      type: ActionType.CHANGE_ACTIVE_OFFER,
      payload: SIMPLE_ID,
    };

    expect(changeActiveOffer(SIMPLE_ID)).toEqual(expected);
  });

  it(`Action creator for getting user status works`, () => {
    const expected = {
      type: ActionType.REQUEST_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    };

    expect(requestAuthorization(AuthorizationStatus.AUTH)).toEqual(expected);
  });

  it(`Action creator for loading offers works`, () => {
    const expected = {
      type: ActionType.LOAD_OFFERS,
      payload: simpleOffers,
    };

    expect(loadOffers(simpleOffers)).toEqual(expected);
  });

  it(`Action creator for loading favorite offers works`, () => {
    const expected = {
      type: ActionType.LOAD_FAVORITES,
      payload: simpleOffers,
    };

    expect(loadFavorites(simpleOffers)).toEqual(expected);
  });

  it(`Action creator for clearing favorite offers works`, () => {
    const expected = {
      type: ActionType.CLEAR_FAVORITES,
    };

    expect(clearFavorites()).toEqual(expected);
  });

  it(`Action creator for clearing offers works`, () => {
    const expected = {
      type: ActionType.CLEAR_OFFERS,
    };

    expect(clearOffers()).toEqual(expected);
  });

  it(`Action creator for saving user info works`, () => {
    const simpleUser = {
      authorizationStatus: AuthorizationStatus.AUTH,
      loggedUser: {
        id: 1,
        email: `qwerty@qwerty.com`,
        name: `qwerty`,
        avatarUrl: ``,
        isPro: true,
      },
    };

    const expected = {
      type: ActionType.SAVE_AUTH_INFO,
      payload: simpleUser,
    };

    expect(saveAuthInfo(simpleUser)).toEqual(expected);
  });

  it(`Action creator for loading offer works`, () => {
    const expected = {
      type: ActionType.LOAD_OFFER,
      payload: simpleOffer,
    };

    expect(loadOffer(simpleOffer)).toEqual(expected);
  });

  it(`Action creator for clearing offer works`, () => {
    const expected = {
      type: ActionType.CLEAR_LOADED_OFFER,
    };

    expect(clearLoadedOffer()).toEqual(expected);
  });

  it(`Action creator for loading related offers works`, () => {
    const expected = {
      type: ActionType.LOAD_RELATED_OFFERS,
      payload: simpleOffers,
    };

    expect(loadRelatedOffers(simpleOffers)).toEqual(expected);
  });

  it(`Action creator for loading reviews works`, () => {
    const expected = {
      type: ActionType.LOAD_REVIEWS,
      payload: simpleReviews,
    };

    expect(loadReviews(simpleReviews)).toEqual(expected);
  });

  it(`Action creator for clearing review form status works`, () => {
    const expected = {
      type: ActionType.RESET_REVIEW_FORM,
    };

    expect(resetReviewForm()).toEqual(expected);
  });

  it(`Action creator for showing review form error works`, () => {
    const expected = {
      type: ActionType.SHOW_REVIEW_ERROR,
    };

    expect(showReviewError()).toEqual(expected);
  });

  it(`Action creator for clearing review form status works`, () => {
    const expected = {
      type: ActionType.CLEAR_REVIEW_FORM_STATUS,
    };

    expect(clearReviewFormStatus()).toEqual(expected);
  });
});

