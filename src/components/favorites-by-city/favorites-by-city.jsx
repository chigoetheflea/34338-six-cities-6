import React from 'react';
import PropTypes from 'prop-types';
import OffersList from '../offers-list/offers-list';

import offersPropTypes from '../../prop-types/offers-prop-types.js';

const FavoritesByCity = ({offers, city}) => {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        <OffersList offers={offers} isInFavoritesList />
      </div>
    </li>
  );
};

FavoritesByCity.propTypes = {
  offers: offersPropTypes,
  city: PropTypes.string.isRequired,
};

export default FavoritesByCity;
