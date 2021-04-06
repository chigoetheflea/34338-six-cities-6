import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import * as redux from 'react-redux';
import configureStore from 'redux-mock-store';

import App from './app';
import {DEFAULT_CITY, Path, SortingType, AuthorizationStatus} from '../../util/const';

const mockStore = configureStore({});

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
  images: [``, ``],
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
  {...simpleOffer},
];

const simpleReview = {
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
};

const simpleReviews = [
  {...simpleReview},
  {...simpleReview},
];

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.AUTH,
    loggedUser: {
      id: 1,
      email: `qwerty@qwerty.com`,
      name: `qwerty`,
      avatarUrl: ``,
      isPro: true,
    },
  },
  OFFERS: {
    offers: simpleOffers,
    isDataLoaded: true,
    isFavoritesLoaded: true,
    favorites: simpleOffers,
    sorting: SortingType.POPULAR,
    city: DEFAULT_CITY,
  },
  OFFER: {
    isOfferLoaded: true,
    isRelatedLoaded: true,
    relatedOffers: simpleOffers,
    hoveredOffer: 1,
    activeOffer: 1,
    loadedOffer: simpleOffer,
  },
  REVIEWS: {
    isReviewsLoaded: true,
    reviewFormStatus: null,
    reviews: simpleReviews,
  },
});

describe(`Test routing`, () => {
  it(`Render 'MainPage' when user navigate to '/' url`, () => {
    const history = createMemoryHistory();

    const {getByText} = render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    const headerElement = getByText(`Cities`);

    expect(headerElement).toBeInTheDocument();
  });

  it(`Render 'Login' when user navigate to '/login' url`, () => {
    const history = createMemoryHistory();
    history.push(Path.LOGIN);

    const {getByTestId} = render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    const titleElement = getByTestId(`login-title`);
    const emailElement = getByTestId(`email`);
    const passwordElement = getByTestId(`password`);
    const buttonElement = getByTestId(`login-button`);

    expect(titleElement).toBeInTheDocument();
    expect(emailElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it(`Render 'Favorites' when user navigate to '/favorites' url`, () => {
    const history = createMemoryHistory();
    history.push(Path.FAVORITES);

    const {getByText} = render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    const headerElement = getByText(`Saved listing`);

    expect(headerElement).toBeInTheDocument();
  });

  it(`Render 'Offer' when user navigate to '/offer/:id' url`, () => {
    const history = createMemoryHistory();
    history.push(`${Path.OFFER}/1`);

    const {getByTestId} = render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    const headerElement = getByTestId(`offer-title`);

    expect(headerElement).toBeInTheDocument();
  });

  it(`Render 'PageNotFound' when user navigate to non-existante route url`, () => {
    const history = createMemoryHistory();
    history.push(`/404`);

    const {getByText} = render(
        <redux.Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    const headerElement = getByText(`Page not found!`);
    const linkElement = getByText(`Return to home page`);

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
