import React from 'react';
import * as redux from 'react-redux';
import {render} from '@testing-library/react';
import configureStore from 'redux-mock-store';

import CitiesList from './cities-list';
import {CITIES} from '../../util/const';

const mockStore = configureStore({});

const store = mockStore({
  OFFERS: {
    city: {
      name: `Paris`,
      location: {
        latitude: 48.856663,
        longitude: 2.351556,
        zoom: 13,
      },
    },
  },
});

it(`CitiesList should render correctly`, () => {
  const {getByText} = render(
      <redux.Provider store={store}>
        <CitiesList cities={CITIES}/>
      </redux.Provider>
  );

  CITIES.forEach((city) => {
    const cityElement = getByText(city.name);

    expect(cityElement).toBeInTheDocument();
  });
});
