import React from 'react';
import * as redux from 'react-redux';
import {render} from '@testing-library/react';
import configureStore from 'redux-mock-store';

import ReviewsList from './reviews-list';

const mockStore = configureStore({});

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
  {
    ...simpleReview,
    id: 2,
  },
];

const simpleOfferId = 10;

const store = mockStore({
  REVIEWS: {
    reviews: simpleReviews,
    isReviewsLoaded: true,
  },
});

it(`ReviewsList should render correctly`, () => {
  const {getByText} = render(
      <redux.Provider store={store}>
        <ReviewsList activeOffer={simpleOfferId}/>
      </redux.Provider>
  );

  const headerElement = getByText(/Reviews/);

  expect(headerElement).toBeInTheDocument();
});
