import React from 'react';
import {render} from '@testing-library/react';

import Loading from './loading';

it(`Loading should render correctly`, () => {
  const {getByAltText} = render(
      <Loading />
  );

  const textElement = getByAltText(`Loading...`);

  expect(textElement).toBeInTheDocument();
});
