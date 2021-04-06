import React from 'react';
import * as redux from 'react-redux';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';

import Header from './header';
import {AuthorizationStatus, Path} from '../../util/const';

const mockStore = configureStore({});

const storeNoLogin = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    loggedUser: null,
  },
});

const storeLogin = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.AUTH,
    loggedUser: {
      id: 1,
      email: `qwerty@qwerty.com`,
      name: `qwerty`,
      avatarUrl: ``,
      isPro: false,
    },
  },

});

describe(`Test Header`, () => {
  it(`Header should render correctly (no login)`, () => {
    const history = createMemoryHistory();
    history.push(Path.LOGIN);

    const {getByText} = render(
        <redux.Provider store={storeNoLogin}>
          <Router history={history}>
            <Header />
          </Router>
        </redux.Provider>
    );

    const linkElement = getByText(`Sign in`);

    expect(linkElement).toBeInTheDocument();
  });

  it(`Header should render correctly (login)`, () => {
    const history = createMemoryHistory();
    history.push(Path.FAVORITES);

    const {getByText} = render(
        <redux.Provider store={storeLogin}>
          <Router history={history}>
            <Header />
          </Router>
        </redux.Provider>
    );

    const linkElement = getByText(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    expect(linkElement).toBeInTheDocument();
  });
});
