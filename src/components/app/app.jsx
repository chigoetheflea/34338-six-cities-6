import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import MainPage from '../main-page/main-page';
import Login from '../login/login';
import Favorites from '../favorites/favorites';
import Offer from '../offer/offer';
import Page404 from '../page-404/page-404';

const App = ({placesCount}) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage placesCount={placesCount} />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/favorites">
          <Favorites />
        </Route>
        <Route exact path="/offer/:id">
          <Offer />
        </Route>
        <Route>
          <Page404 />
        </Route>
      </Switch>
    </Router>
  );
};

App.propTypes = {
  placesCount: PropTypes.number.isRequired,
};

export default App;
