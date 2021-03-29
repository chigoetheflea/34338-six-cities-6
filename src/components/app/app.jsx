import React from 'react';
import {arrayOf} from 'prop-types';
import {connect} from 'react-redux';
import {Router, Route, Switch} from 'react-router-dom';

import MainPage from '../main-page/main-page';
import Login from '../login/login';
import Favorites from '../favorites/favorites';
import Offer from '../offer/offer';
import PageNotFound from '../page-not-found/page-not-found';
import PrivateRoute from '../private-route/private-route';
import {getSortedReviews} from '../../util/util';
import offersPropTypes from '../../prop-types/offers';
import reviewPropTypes from '../../prop-types/reviews';
import browserHistory from '../../services/browser-history';

const App = ({offers, reviews}) => {
  const favoriteOffers = offers.filter(({isFavorite}) => isFavorite);
  const sortedReviews = getSortedReviews(reviews);

  return (
    <Router history={browserHistory}>
      <Switch>
        <Route exact path="/">
          <MainPage offers={offers} />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <PrivateRoute
          exact
          path="/favorites"
          render={() => <Favorites
            offers={favoriteOffers}
          />}
        />
        <Route exact path="/offer/:id">
          <Offer
            reviews={sortedReviews}
            offers={offers}
          />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
};

App.propTypes = {
  offers: arrayOf(offersPropTypes),
  reviews: arrayOf(reviewPropTypes),
};

const mapStateToProps = (state) => ({
  offers: state.offers,
});

export default connect(mapStateToProps)(App);
