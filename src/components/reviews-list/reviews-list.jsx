import React, {useEffect} from 'react';
import {arrayOf, bool, func, number} from 'prop-types';
import {connect} from 'react-redux';

import Review from '../review/review';
import {fetchReviews} from '../../store/api-actions';
import reviewPropTypes from '../../prop-types/reviews';

const ReviewsList = ({activeOffer, reviews, isReviewsLoaded, loadReviews}) => {
  useEffect(() => {
    if (!isReviewsLoaded) {
      loadReviews(activeOffer);
    }
  }, [isReviewsLoaded]);

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
  activeOffer: number.isRequired,
  isReviewsLoaded: bool.isRequired,
  loadReviews: func.isRequired,
};

const mapStateToProps = (state) => ({
  reviews: state.reviews,
  isReviewsLoaded: state.isReviewsLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  loadReviews(id) {
    dispatch(fetchReviews(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsList);
