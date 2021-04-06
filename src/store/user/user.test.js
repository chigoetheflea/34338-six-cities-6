import MockAdapter from 'axios-mock-adapter';
import {createApi} from '../../services/api';

import {user} from './user';
import {ActionType} from '../actions';
import {login, checkAuthorization} from '../../store/api-actions';
import {AuthorizationStatus, Path} from '../../util/const';

const api = createApi(() => {});

const simpleUser = {
  id: 1,
  email: `qwerty@qwerty.com`,
  name: `qwerty`,
  avatarUrl: ``,
  isPro: true,
};

describe(`User reducer works correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      loggedUser: null,
    };

    expect(user(undefined, {})).toEqual(initialState);
  });

  it(`Reducer should update authorization status`, () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    };

    const expected = {
      authorizationStatus: AuthorizationStatus.AUTH,
    };

    const requestAuthorizationStatusAction = {
      type: ActionType.REQUEST_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    };

    expect(user(initialState, requestAuthorizationStatusAction)).toEqual(expected);
  });
});

describe(`Async operations works correctly`, () => {
  it(`Should make a correct API call to /login (get)`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthLoader = checkAuthorization();

    apiMock
      .onGet(Path.LOGIN)
      .reply(200, simpleUser);

    return checkAuthLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SAVE_AUTH_INFO,
          payload: simpleUser,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REQUEST_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
      });
  });

  it(`Should make a correct API call to /login (post)`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {email: `qwerty@qwerty.com`, password: `111`};
    const loginLoader = login(fakeUser);

    apiMock
      .onPost(Path.LOGIN)
      .reply(200, simpleUser);

    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SAVE_AUTH_INFO,
          payload: simpleUser,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REQUEST_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
      });
  });
});

