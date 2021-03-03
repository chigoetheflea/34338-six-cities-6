import React from 'react';
import Review from '../review/review';
import {arrayOf} from 'prop-types';
import reviewPropTypes from '../../prop-types/reviews';

const ReviewsList = ({reviews}) => {
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => <Review key={review.id} review={review} />)}
      </ul>
    </>
  );
};

ReviewsList.propTypes = {
  reviews: arrayOf(reviewPropTypes),
};

export default ReviewsList;
