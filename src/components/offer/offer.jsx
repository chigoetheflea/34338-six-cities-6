import React, {useEffect} from 'react';
import {arrayOf, bool, func, number, string} from 'prop-types';
import {connect} from 'react-redux';
import browserHistory from '../../services/browser-history';

import Header from '../header/header';
import ReviewForm from '../review-form/review-form';
import ReviewsList from '../reviews-list/reviews-list';
import Map from '../map/map';
import Loading from '../loading/loading';
import Related from '../related/related';
import reviewPropTypes from '../../prop-types/reviews';
import offersPropTypes from '../../prop-types/offers';
import {PlaceType, AuthorizationStatus, Path} from '../../util/const';
import {getFormattedRating, getRandomArrayElements} from '../../util/util';
import {fetchOffer, manageFavorite} from '../../store/api-actions';
import {clearLoadedOffer} from '../../store/actions';
import {getLoadedOffer, getOfferLoadingStatus, getActiveOffer, getRelatedOffers, getRelatedLoadingStatus} from '../../store/offer/selectors';
import {getAuthorizationStatus} from '../../store/user/selectors';

const MAX_PHOTO_COUNT = 6;

const Offer = ({
  isOfferLoaded,
  isRelatedLoaded,
  activeOffer,
  loadedOffer,
  loadOffer,
  clearOffer,
  relatedOffers,
  authorizationStatus,
  manageFavoriteStatus,
}) => {
  let neighbourhoodLocations = [];

  if (relatedOffers.length) {
    neighbourhoodLocations = relatedOffers.map(({title, location, id}) => ({id, title, ...location}));

    const {title, location, id} = loadedOffer;
    neighbourhoodLocations.push({title, id, ...location});
  }

  useEffect(() => {
    if (!isOfferLoaded) {
      loadOffer(activeOffer);
    }
  }, [isOfferLoaded, isRelatedLoaded]);

  useEffect(() => () => {
    clearOffer();
  }, []);

  if (!isOfferLoaded) {
    return (
      <Loading />
    );
  }

  const handleFavoriteClick = () => authorizationStatus === AuthorizationStatus.AUTH
    ? manageFavoriteStatus(activeOffer, !loadedOffer.isFavorite)
    : browserHistory.push(Path.LOGIN);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                getRandomArrayElements(loadedOffer.images, MAX_PHOTO_COUNT).map((path) => (
                  <div className="property__image-wrapper" key={path}>
                    <img className="property__image" src={path} alt={loadedOffer.title} />
                  </div>
                ))
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {loadedOffer.isPremium && <div className="property__mark"><span>Premium</span></div>}

              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {loadedOffer.title}
                </h1>
                <button
                  className={`property__bookmark-button button ${(loadedOffer.isFavorite) ? `property__bookmark-button--active` : ``}`}
                  type="button"
                  onClick={handleFavoriteClick}
                >
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${getFormattedRating(loadedOffer.rating)}%`}} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{loadedOffer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {PlaceType[loadedOffer.type.toUpperCase()]}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {loadedOffer.bedrooms} Bedroom{loadedOffer.bedrooms > 1 ? `s` : ``}
                </li>
                <li className="property__feature property__feature--adults">
                  Max {loadedOffer.maxAdults} adult{loadedOffer.maxAdults > 1 ? `s` : ``}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{loadedOffer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {
                    loadedOffer.goods.map((item) => (
                      <li className="property__inside-item" key={item}>
                        {item}
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper user__avatar-wrapper ${loadedOffer.host.isPro ? `property__avatar-wrapper--pro` : `` }`}>
                    <img className="property__avatar user__avatar" src={loadedOffer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {loadedOffer.host.name}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {loadedOffer.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <ReviewsList activeOffer={activeOffer}/>

                {authorizationStatus === AuthorizationStatus.AUTH && <ReviewForm activeOffer={activeOffer} />}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map
              city={loadedOffer.city.location}
              points={neighbourhoodLocations}
            />
          </section>
        </section>

        <Related />
      </main>
    </div>
  );
};

Offer.propTypes = {
  reviews: arrayOf(reviewPropTypes),
  relatedOffers: arrayOf(offersPropTypes),
  loadedOffer: offersPropTypes,
  activeOffer: number,
  authorizationStatus: string.isRequired,
  isOfferLoaded: bool.isRequired,
  isRelatedLoaded: bool.isRequired,
  loadOffer: func.isRequired,
  clearOffer: func.isRequired,
  manageFavoriteStatus: func.isRequired,
};

const mapStateToProps = (state) => ({
  loadedOffer: getLoadedOffer(state),
  isOfferLoaded: getOfferLoadingStatus(state),
  activeOffer: getActiveOffer(state),
  authorizationStatus: getAuthorizationStatus(state),
  relatedOffers: getRelatedOffers(state),
  isRelatedLoaded: getRelatedLoadingStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadOffer(id) {
    dispatch(fetchOffer(id));
  },
  clearOffer() {
    dispatch(clearLoadedOffer());
  },
  manageFavoriteStatus(id, status) {
    dispatch(manageFavorite(id, status));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Offer);
