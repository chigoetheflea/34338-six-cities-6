import {ActionType} from '../actions';
import {adaptReviewsToClient} from '../../util/util';

export const getAdaptedReviews = () => (next) => (action) => {
  if (action.type === ActionType.LOAD_REVIEWS) {
    action.payload = adaptReviewsToClient(action.payload);
  }

  return next(action);
};
