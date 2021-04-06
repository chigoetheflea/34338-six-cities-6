import React from 'react';
import * as redux from 'react-redux';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';

import Favorites from './favorites';
import {AuthorizationStatus, Path} from '../../util/const';

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
  OFFERS: {
    favorites: simpleOffers,
    isFavoritesLoaded: true,
  },
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

it(`Favorites should render correctly`, () => {
  const history = createMemoryHistory();
  history.push(Path.FAVORITES);

  const {getByText} = render(
      <redux.Provider store={store}>
        <Router history={history}>
          <Favorites />
        </Router>
      </redux.Provider>
  );

  const headerElement = getByText(`Saved listing`);

  expect(headerElement).toBeInTheDocument();
});
