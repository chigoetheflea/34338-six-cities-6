import React from 'react';
import {arrayOf, string} from 'prop-types';
import PlaceCard from '../place-card/place-card';
import offersPropTypes from '../../prop-types/offers';

const OffersList = ({offers, cardType}) => {
  return (
    <>
      {
        offers.map((offer) =>
          <PlaceCard
            key={`${offer.id}-${cardType}`}
            offer={offer}
            cardType={cardType}
          />
        )
      }
    </>
  );
};

OffersList.propTypes = {
  offers: arrayOf(offersPropTypes),
  cardType: string.isRequired,
};

export default OffersList;
