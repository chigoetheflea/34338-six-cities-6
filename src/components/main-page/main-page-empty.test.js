import React from 'react';
import {render} from '@testing-library/react';

import MainPageEmpty from './main-page-empty';

const simpleCity = {
  name: `Amsterdam`,
  location: {},
};

it(`MainPageEmpty should render correctly`, () => {
  const {getByText} = render(
      <MainPageEmpty city={simpleCity} />
  );

  const titleElement = getByText(`No places to stay available`);
  const textElement = getByText(/We could not find any property available at the moment in/);

  expect(titleElement).toBeInTheDocument();
  expect(textElement).toBeInTheDocument();
});
