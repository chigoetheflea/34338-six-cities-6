import React from 'react';
import * as redux from 'react-redux';
import {render} from '@testing-library/react';
import configureStore from 'redux-mock-store';

import FavoritesByCity from './favorites-by-city';
import {AuthorizationStatus, DEFAULT_CITY} from '../../util/const';

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

const store = mockStore({
  OFFER: {
    hoveredOffer: 0,
  },
  USER: {
    authorizationStatus: AuthorizationStatus.AUTH,
    loggedUser: {
      id: 1,
      email: `qwerty@qwerty.com`,
      name: `qwerty`,
      avatarUrl: ``,
      isPro: false,
    },
  },
});

it(`FavoritesByCity should render correctly`, () => {
  const {getByTestId} = render(
      <redux.Provider store={store}>
        <FavoritesByCity city={DEFAULT_CITY} offers={simpleOffers} />
      </redux.Provider>
  );

  const titleElement = getByTestId(`favorites-by-city-name`);
  const listElement = getByTestId(`favorites-by-city-list`);

  expect(titleElement).toBeInTheDocument();
  expect(listElement).toBeInTheDocument();
});
