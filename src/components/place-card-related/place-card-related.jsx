import React from 'react';
import {func} from 'prop-types';
import PlaceCard from '../place-card/place-card';
import offersPropTypes from '../../prop-types/offers';

const CardClass = {
  MAIN_CLASS: `near-places__card`,
  IMAGE_CLASS: `near-places__image-wrapper`,
  INFO_CLASS: ``,
};

const PlaceCardRelated = (props) => {
  return (
    <PlaceCard
      classes={CardClass}
      {...props}
    />
  );
};

PlaceCardRelated.propTypes = {
  offer: offersPropTypes,
  hoverHandler: func.isRequired,
};

export default PlaceCardRelated;
