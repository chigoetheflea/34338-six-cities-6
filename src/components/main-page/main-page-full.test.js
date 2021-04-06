import React from 'react';
import * as redux from 'react-redux';
import {render} from '@testing-library/react';
import configureStore from 'redux-mock-store';

import MainPageFull from './main-page-full';
import {AuthorizationStatus, SortingType} from '../../util/const';

const mockStore = configureStore({});

const simpleCity = {
  name: `Amsterdam`,
  location: {},
};

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

const store = mockStore({
  OFFERS: {
    sorting: SortingType.POPULAR,
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

it(`MainPageFull should render correctly`, () => {
  const {getByText, getByTestId} = render(
      <redux.Provider store={store}>
        <MainPageFull city={simpleCity} offers={simpleOffers} />
      </redux.Provider>
  );

  const titleElement = getByText(`Places`);
  const textElement = getByText(/places to stay in/);
  const offersElement = getByTestId(`offers-list`);
  const mapElement = getByTestId(`map`);

  expect(titleElement).toBeInTheDocument();
  expect(textElement).toBeInTheDocument();
  expect(offersElement).toBeInTheDocument();
  expect(mapElement).toBeInTheDocument();
});
