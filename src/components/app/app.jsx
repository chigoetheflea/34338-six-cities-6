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
import offersPropTypes from '../../prop-types/offers';
import browserHistory from '../../services/browser-history';
import {getOffers} from '../../store/offers/selectors';
import {Path} from '../../util/const';

const App = ({offers}) => {
  return (
    <Router history={browserHistory}>
      <Switch>
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
      </Switch>
    </Router>
  );
};

App.propTypes = {
  offers: arrayOf(offersPropTypes),
};

const mapStateToProps = (state) => ({
  offers: getOffers(state),
});

export default connect(mapStateToProps)(App);
