import MockAdapter from 'axios-mock-adapter';
import {createApi} from '../../services/api';

import {reviews} from './reviews';
import {ActionType} from '../actions';
import {fetchReviews, postReview} from '../../store/api-actions';
import {ReviewFormStatus, Path} from '../../util/const';

const api = createApi(() => {}, () => {});

const SIMPLE_OFFER_ID = 10;

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

describe(`Reviews reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    const initialState = {
      isReviewsLoaded: false,
      reviews: [],
      reviewFormStatus: null,
    };

    expect(reviews(undefined, {})).toEqual(initialState);
  });

  it(`Reducer should return reviews loading flag`, () => {
    const initialState = {
      isReviewsLoaded: false,
      reviews: [],
    };

    const expected = {
      isReviewsLoaded: true,
      reviews: simpleReviews,
    };

    const loadReviewsAction = {
      type: ActionType.LOAD_REVIEWS,
      payload: simpleReviews,
    };

    expect(reviews(initialState, loadReviewsAction)).toEqual(expected);
  });

  it(`Reducer should reset review form status`, () => {
    const initialState = {
      reviewFormStatus: null,
    };

    const expected = {
      reviewFormStatus: ReviewFormStatus.SEND,
    };

    const resetFormStatusAction = {
      type: ActionType.RESET_REVIEW_FORM,
    };

    expect(reviews(initialState, resetFormStatusAction)).toEqual(expected);
  });

  it(`Reducer should show form error status`, () => {
    const initialState = {
      reviewFormStatus: null,
    };

    const expected = {
      reviewFormStatus: ReviewFormStatus.ERROR,
    };

    const showFormErrorAction = {
      type: ActionType.SHOW_REVIEW_ERROR,
    };

    expect(reviews(initialState, showFormErrorAction)).toEqual(expected);
  });

  it(`Reducer should clear review form status`, () => {
    const initialState = {
      reviewFormStatus: ReviewFormStatus.SEND,
    };

    const expected = {
      reviewFormStatus: null,
    };

    const clearFormStatusAction = {
      type: ActionType.CLEAR_REVIEW_FORM_STATUS,
    };

    expect(reviews(initialState, clearFormStatusAction)).toEqual(expected);
  });
});

describe(`Async operations works correctly`, () => {
  it(`Should make a correct API call to /comments (get)`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const reviewsLoader = fetchReviews(SIMPLE_OFFER_ID);

    apiMock
      .onGet(`${Path.REVIEWS}/${SIMPLE_OFFER_ID}`)
      .reply(200, simpleReviews);

    return reviewsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: simpleReviews,
        });
      });
  });

  it(`Should make a correct API call to /comments (post)`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeReview = {comment: `Review`, rating: 3, id: 10};
    const reviewsLoader = postReview(fakeReview);

    apiMock
      .onPost(`${Path.REVIEWS}/${SIMPLE_OFFER_ID}`)
      .reply(200, simpleReviews);

    return reviewsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: simpleReviews,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.RESET_REVIEW_FORM,
        });
      });
  });
});
