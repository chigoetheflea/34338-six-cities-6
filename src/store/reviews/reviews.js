import {ActionType} from '../actions';
import {ReviewFormStatus} from '../../util/const';

const initialState = {
  isReviewsLoaded: false,
  reviews: [],
  reviewFormStatus: null,
};

const reviews = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case ActionType.LOAD_REVIEWS:
      return {
        ...state,
        reviews: payload,
        isReviewsLoaded: true,
      };

    case ActionType.RESET_REVIEW_FORM:
      return {
        ...state,
        reviewFormStatus: ReviewFormStatus.SEND,
      };

    case ActionType.SHOW_REVIEW_ERROR:
      return {
        ...state,
        reviewFormStatus: ReviewFormStatus.ERROR,
      };

    case ActionType.CLEAR_REVIEW_FORM_STATUS:
      return {
        ...state,
        reviewFormStatus: null,
      };
  }

  return state;
};

export {reviews};
