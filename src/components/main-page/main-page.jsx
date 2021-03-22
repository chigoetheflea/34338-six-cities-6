import React from 'react';
import {connect} from 'react-redux';
import {arrayOf} from 'prop-types';

import OffersList from '../offers-list/offers-list';
import CitiesList from '../cities-list/cities-list';
import Map from '../map/map';
import Sorting from '../sorting/sorting';
import offersPropTypes from '../../prop-types/offers';
import cityPropTypes from '../../prop-types/city';
import {CITIES, PlaceCardType} from '../../util/const';

const MainPage = ({offers, city}) => {
  const currentCityLocations = offers.map(({id, title, location}) => ({id, title, ...location}));
  const {name, location} = city;

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList cities={CITIES}/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {name}</b>
              <Sorting />
              <div className="cities__places-list places__list tabs__content">
                <OffersList
                  offers={offers}
                  cardType={PlaceCardType.BASIC}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  city={location}
                  points={currentCityLocations}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

MainPage.propTypes = {
  offers: arrayOf(offersPropTypes),
  city: cityPropTypes.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
  offers: state.offers,
});

export {MainPage};
export default connect(mapStateToProps)(MainPage);
