import {createSelector} from 'reselect';
import {NameSpace} from '../root-reducer';
import {getSortedReviews} from '../../util/util';
import {MAX_REVIEWS_COUNT} from '../../util/const';

const getReviewsLoadingStatus = (state) => state[NameSpace.REVIEWS].isReviewsLoaded;

const getDefaultReviews = (state) => state[NameSpace.REVIEWS].reviews;

const getReviewsFormStatus = (state) => state[NameSpace.REVIEWS].reviewFormStatus;

const getReviews = createSelector(
    [getDefaultReviews],
    (reviews) => getSortedReviews(reviews).slice(0, MAX_REVIEWS_COUNT)
);

export {
  getReviewsLoadingStatus,
  getReviews,
  getReviewsFormStatus,
};
