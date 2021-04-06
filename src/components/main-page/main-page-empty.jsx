import React from 'react';
import {DEFAULT_CITY} from '../../util/const';
import cityPropTypes from '../../prop-types/city';

const MainPageEmpty = ({city = DEFAULT_CITY}) => {
  const {name} = city;

  return (
    <div className="cities">
      <div className="cities__places-container cities__places-container--empty container">
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">We could not find any property available at the moment in {name}</p>
          </div>
        </section>
        <div className="cities__right-section"></div>
      </div>
    </div>
  );
};

MainPageEmpty.propTypes = {
  city: cityPropTypes.isRequired,
};

export default MainPageEmpty;
