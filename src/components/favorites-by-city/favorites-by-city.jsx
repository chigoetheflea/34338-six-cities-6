import React from 'react';
import {connect} from 'react-redux';
import {arrayOf, func} from 'prop-types';

import OffersList from '../offers-list/offers-list';
import offersPropTypes from '../../prop-types/offers';
import {changeCity, getOffers, redirectToRoute} from '../../store/actions';
import {PlaceCardType} from '../../util/const';
import cityPropTypes from '../../prop-types/city';

const FavoritesByCity = ({offers, city, updateCity}) => {
  const {name} = city;

  const handleCityChange = (cityForUpdate) => {
    updateCity(cityForUpdate);
  };

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <button
          onClick={handleCityChange.bind(null, city)}
          className="locations__item-link"
        >
          <span>{name}</span>
        </button>
      </div>
      <div className="favorites__places">
        <OffersList
          offers={offers}
          cardType={PlaceCardType.FAVORITE}
        />
      </div>
    </li>
  );
};

FavoritesByCity.propTypes = {
  offers: arrayOf(offersPropTypes),
  city: cityPropTypes.isRequired,
  updateCity: func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  updateCity(city) {
    dispatch(changeCity(city));
    dispatch(getOffers());
    dispatch(redirectToRoute(`/`));
  },
});

export default connect(null, mapDispatchToProps)(FavoritesByCity);
