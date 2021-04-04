import React from 'react';
import {connect} from 'react-redux';
import {func, string} from 'prop-types';

import {ActionCreator} from '../../store/actions';
import offersPropTypes from '../../prop-types/offers';
import {getFormattedRating} from '../../util/util';
import {PlaceType, PlaceCardType, AuthorizationStatus} from '../../util/const';
import {manageFavorite, fetchOffersList, fetchRelatedOffers} from '../../store/api-actions';
import {imageButtonStyle, titleButtonStyle} from './place-card-style';

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

const PlaceCard = ({offer, cardType, updateHoveredOffer, updateActiveOffer, manageFavoriteStatus, authorizationStatus, goToLogin}) => {
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
    : goToLogin();

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
          <img className="place-card__image" src={previewImage} width="260" height="200" alt={title} />
        </button>
      </div>
      <div className={`${cardClasses.info} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${(offer.isFavorite) ? `place-card__bookmark-button--active` : ``}`}
            type="button"
            onClick={handleFavoriteClick}
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
        <h2 className="place-card__name">
          <button
            onClick={handleOfferClick}
            style={titleButtonStyle}
          >
            {title}
          </button>
        </h2>
        <p className="place-card__type">{PlaceType[type.toUpperCase()]}</p>
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
  goToLogin: func.isRequired,
};

const mapStateToProps = (state) => ({
  hoveredOffer: state.hoveredOffer,
  authorizationStatus: state.authorizationStatus,
});

const mapDispatchToProps = (dispatch) => ({
  updateHoveredOffer(id) {
    dispatch(ActionCreator.changeHoveredOffer(id));
  },
  updateActiveOffer(id) {
    dispatch(ActionCreator.clearLoadedOffer());
    dispatch(ActionCreator.changeActiveOffer(id));
    dispatch(ActionCreator.redirectToRoute(`/offer/${id}`));
  },
  manageFavoriteStatus(id, status, cardType) {
    const offers = cardType === PlaceCardType.RELATED ? fetchRelatedOffers(id) : fetchOffersList();

    dispatch(manageFavorite(id, status));
    dispatch(offers);
  },
  goToLogin() {
    dispatch(ActionCreator.redirectToRoute(`/login`));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceCard);
