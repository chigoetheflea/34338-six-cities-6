import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {arrayOf, bool, func} from 'prop-types';

import Header from '../header/header';
import Loading from '../loading/loading';
import FavoritesEmpty from './favorites-empty';
import FavoritesFull from './favorites-full';
import offersPropTypes from '../../prop-types/offers';
import {fetchFavoritesList} from '../../store/api-actions';
import {getFavorites, getFavoritesLoadingStatus} from '../../store/offers/selectors';
import {clearFavorites} from '../../store/actions';

const Favorites = ({offers, isFavoritesLoaded, loadFavoriteOffers, clearFavoriteOffers}) => {
  useEffect(() => {
    if (!isFavoritesLoaded) {
      loadFavoriteOffers();
    }
  }, [isFavoritesLoaded]);

  useEffect(() => () => {
    clearFavoriteOffers();
  }, []);

  if (!isFavoritesLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites" data-testid="favorites-container">
            {offers.length ? <FavoritesFull offers={offers} /> : <FavoritesEmpty />}
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link
          className="footer__logo-link"
          to="/"
        >
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
};

Favorites.propTypes = {
  offers: arrayOf(offersPropTypes),
  isFavoritesLoaded: bool.isRequired,
  loadFavoriteOffers: func.isRequired,
  clearFavoriteOffers: func.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getFavorites(state),
  isFavoritesLoaded: getFavoritesLoadingStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadFavoriteOffers() {
    dispatch(fetchFavoritesList());
  },
  clearFavoriteOffers() {
    dispatch(clearFavorites());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
