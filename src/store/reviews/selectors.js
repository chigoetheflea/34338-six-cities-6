import {NameSpace} from '../root-reducer';

const getReviewsLoadingStatus = (state) => state[NameSpace.REVIEWS].isReviewsLoaded;

const getReviews = (state) => state[NameSpace.REVIEWS].reviews;

const getReviewsFormStatus = (state) => state[NameSpace.REVIEWS].reviewFormStatus;

export {
  getReviewsLoadingStatus,
  getReviews,
  getReviewsFormStatus,
};
