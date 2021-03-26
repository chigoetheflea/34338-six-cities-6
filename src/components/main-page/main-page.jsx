import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {arrayOf, bool, func} from 'prop-types';

import OffersList from '../offers-list/offers-list';
import CitiesList from '../cities-list/cities-list';
import Map from '../map/map';
import Sorting from '../sorting/sorting';
import Loading from '../loading/loading';
import Header from '../header/header';
import offersPropTypes from '../../prop-types/offers';
import cityPropTypes from '../../prop-types/city';
import {CITIES, PlaceCardType} from '../../util/const';
import {fetchOffersList} from '../../store/api-actions';

const MainPage = ({offers, city, isDataLoaded, loadOffers}) => {
  const currentCityLocations = offers.map(({id, title, location}) => ({id, title, ...location}));
  const {name, location} = city;

  useEffect(() => {
    if (!isDataLoaded) {
      loadOffers();
    }
  }, [isDataLoaded]);

  if (!isDataLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <div className="page page--gray page--main">
      <Header isFrontPage />

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
  isDataLoaded: bool.isRequired,
  loadOffers: func.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
  offers: state.filteredOffers,
  isDataLoaded: state.isDataLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  loadOffers() {
    dispatch(fetchOffersList());
  },
});

export {MainPage};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
