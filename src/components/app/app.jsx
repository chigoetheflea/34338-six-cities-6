import React from 'react';
import {arrayOf, bool} from 'prop-types';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import MainPage from '../main-page/main-page';
import Login from '../login/login';
import Favorites from '../favorites/favorites';
import Offer from '../offer/offer';
import PageNotFound from '../page-not-found/page-not-found';
import NotAvailable from '../not-available/not-available';
import PrivateRoute from '../private-route/private-route';
import offersPropTypes from '../../prop-types/offers';
import {getOffers} from '../../store/offers/selectors';
import {getServerAvailability} from '../../store/app/selectors';
import {Path} from '../../util/const';

const App = ({offers, isServerAvailable}) => {
  return (
    isServerAvailable ? <Switch>
      <Route exact path={Path.HOME}>
        <MainPage offers={offers} />
      </Route>
      <Route exact path={Path.LOGIN}>
        <Login />
      </Route>
      <PrivateRoute
        exact
        path={Path.FAVORITES}
        render={() => <Favorites />}
      />
      <Route exact path={`${Path.OFFER}/:id`}>
        <Offer/>
      </Route>
      <Route>
        <PageNotFound />
      </Route>
    </Switch> : <NotAvailable />
  );
};

App.propTypes = {
  offers: arrayOf(offersPropTypes),
  isServerAvailable: bool,
};

const mapStateToProps = (state) => ({
  offers: getOffers(state),
  isServerAvailable: getServerAvailability(state),
});

export default connect(mapStateToProps)(App);
