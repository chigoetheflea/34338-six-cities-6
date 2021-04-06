import React from 'react';
import * as redux from 'react-redux';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';

import PageNotFound from './page-not-found';
import {AuthorizationStatus, Path} from '../../util/const';

const mockStore = configureStore({});

const store = mockStore({
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

it(`PageNotFound should render correctly`, () => {
  const history = createMemoryHistory();
  history.push(Path.PAGE_404);

  const {getByText} = render(
      <redux.Provider store={store}>
        <Router history={history}>
          <PageNotFound />
        </Router>
      </redux.Provider>
  );

  const headerElement = getByText(`Page not found!`);
  const linkElement = getByText(`Return to home page`);

  expect(headerElement).toBeInTheDocument();
  expect(linkElement).toBeInTheDocument();
});
