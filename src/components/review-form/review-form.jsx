import React, {useState, useRef, useEffect} from 'react';
import {connect} from 'react-redux';
import {func, number, string} from 'prop-types';

import {postReview} from '../../store/api-actions';
import {getReviewValidityMessage} from '../../util/util';
import {ReviewSettings, ReviewFormStatus} from '../../util/const';
import {ActionCreator} from '../../store/actions';

const ERROR_MESSAGE = `Sending error. Try again`;

const ReviewForm = ({sendReview, activeOffer, formStatus, clearStatus}) => {
  const formRef = useRef();
  const reviewRef = useRef();

  const [reviewForm, setReviewForm] = useState({
    rating: null,
    review: null,
    isDisabled: true,
    isError: false,
  });

  const clearForm = () => {
    setReviewForm({
      rating: null,
      review: null,
      isDisabled: true,
      isError: false,
    });

    reviewRef.current.value = ``;
  };

  useEffect(() => {
    if (formStatus === ReviewFormStatus.SEND) {
      clearForm();
    }

    if (formStatus === ReviewFormStatus.ERROR) {
      setReviewForm({
        ...reviewForm,
        isError: true,
        isDisabled: false,
      });
    }

    return () => {
      clearStatus();
    };
  }, [formStatus]);

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    const reviewData = {
      comment: reviewForm.review,
      rating: reviewForm.rating,
      id: activeOffer,
    };

    setReviewForm({
      ...reviewForm,
      isDisabled: true,
    });

    sendReview(reviewData);
  };

  const handleReviewChange = (evt) => {
    const target = evt.target;
    const {value} = target;

    target.setCustomValidity(getReviewValidityMessage(value));
    target.reportValidity();

    setReviewForm({
      ...reviewForm,
      review: value,
      isDisabled: !formRef.current.checkValidity(),
    });
  };

  const handleRatingChange = (evt) => {
    const {value} = evt.target;

    setReviewForm({
      ...reviewForm,
      rating: value,
      isDisabled: !formRef.current.checkValidity(),
    });
  };

  return (
    <form
      ref={formRef}
      className="reviews__form form"
      onSubmit={handleFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
          onChange={handleRatingChange}
          checked={+reviewForm.rating === 5}
          required
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star" />
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="4"
          id="4-stars"
          type="radio"
          onChange={handleRatingChange}
          checked={+reviewForm.rating === 4}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star" />
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="3"
          id="3-stars"
          type="radio"
          onChange={handleRatingChange}
          checked={+reviewForm.rating === 3}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star" />
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="2"
          id="2-stars"
          type="radio"
          onChange={handleRatingChange}
          checked={+reviewForm.rating === 2}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star" />
          </svg>
        </label>

        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="1"
          id="1-star"
          type="radio"
          onChange={handleRatingChange}
          checked={+reviewForm.rating === 1}
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      </div>
      <textarea
        ref={reviewRef}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleReviewChange}
        maxLength={ReviewSettings.MAX_LENGTH}
        required
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{ReviewSettings.MIN_LENGTH} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={reviewForm.isDisabled ? `disabled` : ``}>Submit</button>
      </div>
      {reviewForm.isError && <p>{ERROR_MESSAGE}</p>}
    </form>
  );
};

ReviewForm.propTypes = {
  activeOffer: number.isRequired,
  sendReview: func.isRequired,
  formStatus: string,
  clearStatus: func.isRequired,
};

const mapStateToProps = (state) => ({
  formStatus: state.reviewFormStatus,
});

const mapDispatchToProps = (dispatch) => ({
  sendReview(data) {
    dispatch(postReview(data));
  },
  clearStatus() {
    dispatch(ActionCreator.clearReviewFormStatus());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
