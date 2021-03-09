import React, {useState} from 'react';
import {arrayOf, string} from 'prop-types';
import PlaceCard from '../place-card/place-card';
import offersPropTypes from '../../prop-types/offers';

const OffersList = ({offers, cardType}) => {
  const [, setActiveOffer] = useState(null);

  return (
    <>
      {
        offers.map((offer) =>
          <PlaceCard
            key={`${offer.id}`}
            offer={offer}
            cardType={cardType}
            setActiveOffer={setActiveOffer}
          />)
      }
    </>
  );
};

OffersList.propTypes = {
  offers: arrayOf(offersPropTypes),
  cardType: string.isRequired,
};

export default OffersList;
