import React, {useState} from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card';

import offersPropTypes from '../../prop-types/offers';

const OffersList = ({offers, isInFavoritesList}) => {
  const [, setActiveOffer] = useState(null);

  return (
    <>
      {
        offers.map((offer) =>
          <PlaceCard
            key={`${offer.id}`}
            offer={offer}
            isInFavoritesList={isInFavoritesList}
            hoverHandler={setActiveOffer}
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
