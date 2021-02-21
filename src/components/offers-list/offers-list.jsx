import React, {useState} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';

import offersPropTypes from '../../prop-types/offers-prop-types.js';

const OffersList = ({offers, isInFavoritesList}) => {
  const [activeOffer, setActiveOffer] = useState({
    activeOfferId: null
  });

  return (
    <>
      {
        offers.map((offer) =>
          <PlaceCard
            key={`${offer.id}`}
            offer={offer}
            isInFavoritesList={isInFavoritesList}
            onHoverHandler={() => {
              setActiveOffer({...activeOffer, activeOfferId: offer.id});
            }}
          />)
      }
    </>
  );
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(offersPropTypes),
  isInFavoritesList: PropTypes.bool.isRequired,
};

export default OffersList;
