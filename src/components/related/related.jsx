import React, {useEffect} from 'react';
import {arrayOf, bool, func, number} from 'prop-types';
import {connect} from 'react-redux';

import OffersList from '../offers-list/offers-list';
import Loading from '../loading/loading';
import {PlaceCardType} from '../../util/const';
import {fetchRelatedOffers} from '../../store/api-actions';
import offersPropTypes from '../../prop-types/offers';
import {getActiveOffer, getRelatedLoadingStatus, getRelatedOffers} from '../../store/offer/selectors';

const Related = ({activeOffer, relatedOffers, isRelatedLoaded, loadRelatedOffers}) => {
  useEffect(() => {
    if (!isRelatedLoaded) {
      loadRelatedOffers(activeOffer);
    }
  }, [isRelatedLoaded]);

  if (!isRelatedLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          <OffersList
            offers={relatedOffers}
            cardType={PlaceCardType.RELATED}
          />
        </div>
      </section>
    </div>
  );
};

Related.propTypes = {
  activeOffer: number.isRequired,
  isRelatedLoaded: bool.isRequired,
  loadRelatedOffers: func.isRequired,
  relatedOffers: arrayOf(offersPropTypes),
};

const mapStateToProps = (state) => ({
  activeOffer: getActiveOffer(state),
  isRelatedLoaded: getRelatedLoadingStatus(state),
  relatedOffers: getRelatedOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadRelatedOffers(activeOffer) {
    dispatch(fetchRelatedOffers(activeOffer));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Related);
