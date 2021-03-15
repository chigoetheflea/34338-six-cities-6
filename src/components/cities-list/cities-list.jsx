import React from 'react';
import {connect} from 'react-redux';
import {arrayOf, func} from 'prop-types';
import {ActionCreator} from '../../store/actions';

import cityPropTypes from '../../prop-types/city';

const CitiesList = (props) => {
  const {cities, city: currentCity, handleCityChange} = props;

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
  handleCityChange: func.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
});

const mapDispatchToProps = (dispatch) => ({
  handleCityChange(city) {
    dispatch(ActionCreator.changeCity(city));

    dispatch(ActionCreator.getOffers());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
