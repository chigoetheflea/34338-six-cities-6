import React from 'react';
import {connect} from 'react-redux';
import {arrayOf, func} from 'prop-types';

import {changeCity, getOffers} from '../../store/actions';
import cityPropTypes from '../../prop-types/city';
import {getCity} from '../../store/offers/selectors';

const CitiesList = (props) => {
  const {cities, city: currentCity, updateCity} = props;

  const handleCityChange = (city) => {
    updateCity(city);
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            cities.map((city) => {
              const {name} = city;
              const tabActiveClass = name === currentCity.name ? ` tabs__item--active` : ``;

              return (
                <li className="locations__item" key={name}>
                  <button
                    className={`locations__item-link tabs__item${tabActiveClass}`}
                    onClick={handleCityChange.bind(null, city)}
                  >
                    <span>{name}</span>
                  </button>
                </li>
              );
            })
          }
        </ul>
      </section>
    </div>
  );
};

CitiesList.propTypes = {
  cities: arrayOf(cityPropTypes).isRequired,
  city: cityPropTypes.isRequired,
  updateCity: func.isRequired,
};

const mapStateToProps = (state) => ({
  city: getCity(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateCity(city) {
    dispatch(changeCity(city));
    dispatch(getOffers());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
