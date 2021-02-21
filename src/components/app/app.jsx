import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import MainPage from '../main-page/main-page';
import Login from '../login/login';
import Favorites from '../favorites/favorites';
import Offer from '../offer/offer';
import PageNotFound from '../page-not-found/page-not-found';

import offersPropTypes from '../../prop-types/offers-prop-types.js';

const App = ({offers}) => {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage offers={offers} />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/favorites">
          <Favorites offers={favoriteOffers} />
        </Route>
        <Route exact path="/offer/:id">
          <Offer />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
};

App.propTypes = {
  offers: PropTypes.arrayOf(offersPropTypes),
};

export default App;
