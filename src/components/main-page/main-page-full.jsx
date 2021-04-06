import React from 'react';
import {arrayOf} from 'prop-types';

import Sorting from '../sorting/sorting';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import {PlaceCardType} from '../../util/const';
import offersPropTypes from '../../prop-types/offers';
import cityPropTypes from '../../prop-types/city';

const MainPageFull = ({offers, city}) => {
  const currentCityLocations = offers.map(({id, title, location}) => ({id, title, ...location}));
  const {location, name} = city;

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in {name}</b>
          <Sorting />
          <div className="cities__places-list places__list tabs__content" data-testid="offers-list">
            <OffersList
              offers={offers}
              cardType={PlaceCardType.BASIC}
            />
          </div>
        </section>
        <div className="cities__right-section">
          <section className="cities__map map" data-testid="map">
            <Map
              city={location}
              points={currentCityLocations}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

MainPageFull.propTypes = {
  offers: arrayOf(offersPropTypes),
  city: cityPropTypes.isRequired,
};

export default MainPageFull;
