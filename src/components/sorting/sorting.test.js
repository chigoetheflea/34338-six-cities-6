import React from 'react';
import * as redux from 'react-redux';
import {render} from '@testing-library/react';
import configureStore from 'redux-mock-store';

import Sorting from './sorting';
import {SortingType} from '../../util/const';

const mockStore = configureStore({});

const store = mockStore({
  OFFERS: {
    sorting: SortingType.POPULAR,
  },
});

it(`Sorting should render correctly`, () => {
  const {getByText, getByTestId} = render(
      <redux.Provider store={store}>
        <Sorting updateSortingType={SortingType.PRICE_DECREASE}/>
      </redux.Provider>
  );

  const headerElement = getByText(`Sort by`);
  expect(headerElement).toBeInTheDocument();

  const sortingTypes = Object.values(SortingType);

  sortingTypes.forEach((type) => {
    const sortingElement = getByTestId(type);

    expect(sortingElement).toBeInTheDocument();
  });
});
