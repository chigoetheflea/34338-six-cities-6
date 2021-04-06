import React from 'react';
import {render} from '@testing-library/react';

import Review from './review';

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

it(`ReviewsList should render correctly`, () => {
  const {getByText, getByAltText} = render(
      <Review review={simpleReview}/>
  );

  const ratingElement = getByText(`Rating`);
  const avatarElement = getByAltText(/avatar/);
  const dateElement = getByText(/\w+\s\d+/);

  expect(ratingElement).toBeInTheDocument();
  expect(avatarElement).toBeInTheDocument();
  expect(dateElement).toBeInTheDocument();
});
