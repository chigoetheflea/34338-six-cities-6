import React from 'react';
import {connect} from 'react-redux';
import {func, string} from 'prop-types';
import {Link} from 'react-router-dom';

import {ActionCreator} from '../../store/actions';
import offersPropTypes from '../../prop-types/offers';
import {getFormattedRating} from '../../util/util';

const getCardClass = (cardType) => {
  switch (cardType) {
    case `FAVORITE`:
      return {
        main: `favorites__card`,
        image: `favorites__image-wrapper`,
        info: `favorites__card-info`,
      };

    case `RELATED`:
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

const PlaceCard = ({offer, cardType, updateActiveOffer}) => {
  const {previewImage, isPremium, price, title, type, isFavorite, rating, id} = offer;
  const offerLink = `/offer/${id}`;
  const cardClasses = getCardClass(cardType);

  const handleOfferHoverIn = () => {
    updateActiveOffer(id);
  };

  const handleOfferHoverOut = () => {
    updateActiveOffer(null);
  };

  return (
    <article className={`${cardClasses.main} place-card`} onMouseEnter={handleOfferHoverIn} onMouseLeave={handleOfferHoverOut}>
      {isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div className={`${cardClasses.image} place-card__image-wrapper`}>
        <Link to={offerLink}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt={title} />
        </Link>
      </div>
      <div className={`${cardClasses.info} place-card__info`}>
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
            <span style={{width: `${getFormattedRating(rating)}%`}} />
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
  cardType: string.isRequired,
  updateActiveOffer: func.isRequired,
};

const mapStateToProps = (state) => ({
  activeOffer: state.activeOffer,
});

const mapDispatchToProps = (dispatch) => ({
  updateActiveOffer(id) {
    dispatch(ActionCreator.changeActiveOffer(id));
  }
});

// export default PlaceCard;
export default connect(mapStateToProps, mapDispatchToProps)(PlaceCard);
