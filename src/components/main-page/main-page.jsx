import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {arrayOf, bool, func} from 'prop-types';

import CitiesList from '../cities-list/cities-list';
import MainPageEmpty from './main-page-empty';
import MainPageFull from './main-page-full';
import Loading from '../loading/loading';
import Header from '../header/header';
import offersPropTypes from '../../prop-types/offers';
import cityPropTypes from '../../prop-types/city';
import {CITIES} from '../../util/const';
import {fetchOffersList} from '../../store/api-actions';
import {getCity, getDataLoadingStatus, getFilteredOffers} from '../../store/offers/selectors';

const MainPage = ({offers, city, isDataLoaded, loadOffers}) => {
  const [mainPage, setMainPage] = useState({
    isListEmpty: true,
  });

  useEffect(() => {
    if (!isDataLoaded) {
      loadOffers();
    }

    if (offers.length) {
      setMainPage({
        isListEmpty: false,
      });
    }

  }, [isDataLoaded]);

  if (!isDataLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <div className={`page page--gray page--main ${mainPage.isListEmpty ? `page__main--index-empty` : ``}`}>
      <Header isFrontPage />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList cities={CITIES}/>
        {mainPage.isListEmpty ? <MainPageEmpty /> : <MainPageFull city={city} offers={offers} />}
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
  city: getCity(state),
  offers: getFilteredOffers(state),
  isDataLoaded: getDataLoadingStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadOffers() {
    dispatch(fetchOffersList());
  },
});

export {MainPage};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
