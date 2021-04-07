import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import App from './components/app/app';
import rootReducer from './store/root-reducer';
import {createApi} from './services/api';
import {requestAuthorization, checkServerAvailability} from './store/actions';
import {checkAuthorization, fetchOffersList} from './store/api-actions';
import {AuthorizationStatus} from './util/const';
import {getAdaptedOffers} from './store/middlewares/offers';
import {getAdaptedUserInfo} from './store/middlewares/user';
import {getAdaptedReviews} from './store/middlewares/reviews';
import browserHistory from './services/browser-history';

const api = createApi(
    () => store.dispatch(requestAuthorization(AuthorizationStatus.NO_AUTH)),
    (status) => store.dispatch(checkServerAvailability(status))
);

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api)),
        applyMiddleware(getAdaptedOffers),
        applyMiddleware(getAdaptedUserInfo),
        applyMiddleware(getAdaptedReviews)
    )
);

store.dispatch(checkAuthorization());
store.dispatch(fetchOffersList());

ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <App />
      </Router>
    </Provider>,
    document.querySelector(`#root`)
);
