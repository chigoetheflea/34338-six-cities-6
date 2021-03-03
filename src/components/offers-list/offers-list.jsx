import React, {useState} from 'react';
import {arrayOf, string} from 'prop-types';

import PlaceCardBasic from '../place-card-basic/place-card-basic';
import PlaceCardFavorite from '../place-card-favorite/place-card-favorite';
import PlaceCardRelated from '../place-card-related/place-card-related';

import {PlaceCardType} from '../../util/const';
import offersPropTypes from '../../prop-types/offers';

const getPlaceCardByType = (type, offer, hoverHandler) => {
  switch (type) {
    case PlaceCardType.FAVORITE:
      return <PlaceCardFavorite
        key={`${offer.id}`}
        offer={offer}
        hoverHandler={hoverHandler}
      />;

    case PlaceCardType.RELATED:
      return <PlaceCardRelated
        key={`${offer.id}`}
        offer={offer}
        hoverHandler={hoverHandler}
      />;
  }

  return <PlaceCardBasic
    key={`${offer.id}`}
    offer={offer}
    hoverHandler={hoverHandler}
  />;
};

const OffersList = ({offers, type}) => {
  const [, setActiveOffer] = useState(null);

  return (
    <>
      {offers.map((offer) => getPlaceCardByType(type, offer, setActiveOffer))}
    </>
  );
};

OffersList.propTypes = {
  offers: arrayOf(offersPropTypes),
  type: string.isRequired,
};

export default OffersList;
