import React from 'react';
import {arrayOf} from 'prop-types';
import InnerPageHeader from '../inner-page-header/inner-page-header';
import FavoritesByCity from '../favorites-by-city/favorites-by-city';

import offersPropTypes from '../../prop-types/offers';
import {CITIES} from '../../util/const';

const Favorites = ({offers}) => {
  return (
    <div className="page">
      <InnerPageHeader />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {CITIES.map((city) => {
                const {name: currentCityName} = city;

                const offersInCity = offers.filter(({city: {name}}) => name === currentCityName);

                return (
                  offersInCity.length > 0 && <FavoritesByCity key={currentCityName} offers={offersInCity} city={currentCityName} />
                );
              })}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
};

Favorites.propTypes = {
  offers: arrayOf(offersPropTypes),
};

export default Favorites;
