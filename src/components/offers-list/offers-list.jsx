import React, {useState} from 'react';
import {arrayOf, bool} from 'prop-types';
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
  offers: arrayOf(offersPropTypes),
  isInFavoritesList: bool.isRequired,
};

export default OffersList;
