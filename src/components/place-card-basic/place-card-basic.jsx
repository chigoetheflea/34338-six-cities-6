import React from 'react';
import {func} from 'prop-types';
import PlaceCard from '../place-card/place-card';
import offersPropTypes from '../../prop-types/offers';

const CardClass = {
  MAIN_CLASS: `cities__place-card`,
  IMAGE_CLASS: `cities__image-wrapper`,
  INFO_CLASS: ``,
};

const PlaceCardBasic = (props) => {
  return (
    <PlaceCard
      classes={CardClass}
      {...props}
    />
  );
};

PlaceCardBasic.propTypes = {
  offer: offersPropTypes,
  hoverHandler: func.isRequired,
};

export default PlaceCardBasic;
