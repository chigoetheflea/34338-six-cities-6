import React from 'react';
import {arrayOf} from 'prop-types';

import FavoritesByCity from '../favorites-by-city/favorites-by-city';
import offersPropTypes from '../../prop-types/offers';
import {CITIES} from '../../util/const';

const FavoritesFull = ({offers}) => {
  return (
    <>
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {CITIES.map((city) => {
          const {name: currentCityName} = city;

          const offersInCity = offers.filter(({city: {name}}) => name === currentCityName);

          return (
            offersInCity.length > 0 && <FavoritesByCity key={currentCityName} offers={offersInCity} city={city} />
          );
        })}
      </ul>
    </>
  );
};

FavoritesFull.propTypes = {
  offers: arrayOf(offersPropTypes),
};

export default FavoritesFull;
