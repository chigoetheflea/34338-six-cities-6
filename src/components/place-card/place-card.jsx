import React from 'react';
import {connect} from 'react-redux';
import {func, string} from 'prop-types';
import browserHistory from '../../services/browser-history';

import {changeHoveredOffer, clearLoadedOffer, changeActiveOffer} from '../../store/actions';
import offersPropTypes from '../../prop-types/offers';
import {getFormattedRating} from '../../util/util';
import {PlaceType, PlaceCardType, AuthorizationStatus, Path} from '../../util/const';
import {manageFavorite, fetchOffersList, fetchRelatedOffers, fetchFavoritesList} from '../../store/api-actions';
import {imageButtonStyle, titleButtonStyle} from './place-card-style';
import {getHoveredOffer} from '../../store/offer/selectors';
import {getAuthorizationStatus} from '../../store/user/selectors';

const getCardClass = (cardType) => {
  switch (cardType) {
    case PlaceCardType.FAVORITE:
      return {
        main: `favorites__card`,
        image: `favorites__image-wrapper`,
        info: `favorites__card-info`,
      };

    case PlaceCardType.RELATED:
      return {
        main: `near-places__card`,
        image: `near-places__image-wrapper`,
        info: ``,
      };
  }

  return {
    main: `cities__place-card`,
    image: `cities__image-wrapper`,
    info: ``,
  };
};

const PlaceCard = ({offer, cardType, updateHoveredOffer, updateActiveOffer, manageFavoriteStatus, authorizationStatus}) => {
  const {previewImage, isPremium, price, title, type, isFavorite, rating, id} = offer;
  const cardClasses = getCardClass(cardType);

  const handleOfferHoverIn = () => {
    updateHoveredOffer(id);
  };

  const handleOfferHoverOut = () => {
    updateHoveredOffer(null);
  };

  const handleOfferClick = () => {
    updateActiveOffer(id);
  };

  const handleFavoriteClick = () => authorizationStatus === AuthorizationStatus.AUTH
    ? manageFavoriteStatus(id, !isFavorite, cardType)
    : browserHistory.push(Path.LOGIN);

  return (
    <article
      className={`${cardClasses.main} place-card`}
      onMouseEnter={handleOfferHoverIn}
      onMouseLeave={handleOfferHoverOut}
    >
      {isPremium && <div className="place-card__mark"><span>Premium</span></div>}

      <div className={`${cardClasses.image} place-card__image-wrapper`}>
        <button
          onClick={handleOfferClick}
          style={imageButtonStyle}
        >
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt={title}
            data-testid="place-card-image"
          />
        </button>
      </div>
      <div className={`${cardClasses.info} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price" data-testid="place-card-price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${(offer.isFavorite) ? `place-card__bookmark-button--active` : ``}`}
            type="button"
            onClick={handleFavoriteClick}
            data-testid="place-card-to-favorite"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getFormattedRating(rating)}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name" data-testid="place-card-title">
          <button
            onClick={handleOfferClick}
            style={titleButtonStyle}
          >
            {title}
          </button>
        </h2>
        <p className="place-card__type" data-testid="place-card-type">{PlaceType[type.toUpperCase()]}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  offer: offersPropTypes,
  cardType: string.isRequired,
  authorizationStatus: string.isRequired,
  updateHoveredOffer: func.isRequired,
  updateActiveOffer: func.isRequired,
  manageFavoriteStatus: func.isRequired,
};

const mapStateToProps = (state) => ({
  hoveredOffer: getHoveredOffer(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateHoveredOffer(id) {
    dispatch(changeHoveredOffer(id));
  },
  updateActiveOffer(id) {
    dispatch(clearLoadedOffer());
    dispatch(changeActiveOffer(id));
    browserHistory.push(`${Path.OFFER}/${id}`);
  },
  manageFavoriteStatus(id, status, cardType) {
    let offers = [];

    switch (cardType) {
      case PlaceCardType.RELATED:
        offers = fetchRelatedOffers(id);
        break;

      case PlaceCardType.FAVORITE:
        offers = fetchFavoritesList();
        break;

      default:
        offers = fetchOffersList();
    }

    dispatch(manageFavorite(id, status));
    dispatch(offers);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceCard);
