import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import offersPropTypes from '../../prop-types/offers-prop-types.js';

import {getFormattedRating} from '../../util/util.js';

const PlaceCard = ({offer, onHoverHandler, isInFavoritesList}) => {
  const {previewImage, isPremium, price, title, type, isFavorite, rating, id} = offer;
  const offerLink = `/offer/${id}`;

  return (
    <article className={`${(isInFavoritesList) ? `favorites__card` : `cities__place-card`} place-card`} onMouseEnter={onHoverHandler}>
      {(isPremium) ? <div className="place-card__mark"><span>Premium</span></div> : ``}
      <div className={`${(isInFavoritesList) ? `favorites__image-wrapper` : `cities__image-wrapper`} place-card__image-wrapper`}>
        <Link to={offerLink}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt={title} />
        </Link>
      </div>
      <div className={`${(isInFavoritesList) ? `favorites__card-info` : ``} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${(isFavorite) ? `place-card__bookmark-button--active` : ``}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={getFormattedRating(rating)} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={offerLink}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  offer: offersPropTypes,
  onHoverHandler: PropTypes.func.isRequired,
  isInFavoritesList: PropTypes.bool.isRequired,
};

export default PlaceCard;
