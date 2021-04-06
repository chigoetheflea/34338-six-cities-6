import React from 'react';
import * as redux from 'react-redux';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Path} from '../../util/const';

import Login from './login';
import {AuthorizationStatus} from '../../util/const';

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

it(`Login should render correctly`, () => {
  const history = createMemoryHistory();
  history.push(Path.LOGIN);

  const {getByTestId} = render(
      <redux.Provider store={store}>
        <Router history={history}>
          <Login />
        </Router>
      </redux.Provider>
  );

  const titleElement = getByTestId(`login-title`);
  const emailElement = getByTestId(`email`);
  const passwordElement = getByTestId(`password`);
  const buttonElement = getByTestId(`login-button`);

  expect(titleElement).toBeInTheDocument();
  expect(emailElement).toBeInTheDocument();
  expect(passwordElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});
