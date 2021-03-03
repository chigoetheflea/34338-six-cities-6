import React from 'react';
import {func} from 'prop-types';
import PlaceCard from '../place-card/place-card';
import offersPropTypes from '../../prop-types/offers';

const CardClass = {
  MAIN_CLASS: `favorites__card`,
  IMAGE_CLASS: `favorites__image-wrapper`,
  INFO_CLASS: `favorites__card-info`,
};

const PlaceCardFavorite = (props) => {
  return (
    <PlaceCard
      classes={CardClass}
      {...props}
    />
  );
};

PlaceCardFavorite.propTypes = {
  offer: offersPropTypes,
  hoverHandler: func.isRequired,
};

export default PlaceCardFavorite;
