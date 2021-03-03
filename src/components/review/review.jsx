import React from 'react';
import reviewPropTypes from '../../prop-types/reviews';
import {getFormattedRating, getFormattedDate} from '../../util/util';

const AvatarSize = {
  WIDTH: 54,
  HEIGHT: 54,
};

const Review = ({review}) => {
  const {comment, date, rating, user} = review;
  const {avatarUrl, name} = user;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatarUrl} width={AvatarSize.WIDTH} height={AvatarSize.HEIGHT} alt={`${name} avatar`} />
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${getFormattedRating(rating)}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={getFormattedDate({sourceDate: date, dateFormat: `yyyy-mm-dd`})}>
          {getFormattedDate({sourceDate: date, dateFormat: `month-yyyy`})}
        </time>
      </div>
    </li>
  );
};

Review.propTypes = {
  review: reviewPropTypes,
};

export default Review;
