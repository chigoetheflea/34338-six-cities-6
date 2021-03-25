import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import App from './components/app/app';
import {reducer} from './store/reducer';
import {createApi} from './services/api';
import {ActionCreator} from './store/actions';
import {fetchOffersList} from './store/api-actions';
import {AuthorizationStatus} from './util/const';
import {getAdaptedOffers} from './store/middlewares/offers';
import reviews from './mocks/reviews';

const api = createApi(() => store.dispatch(ActionCreator.requestAuthorization(AuthorizationStatus.NO_AUTH)));

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api)),
        applyMiddleware(getAdaptedOffers)
    )
);

store.dispatch(fetchOffersList());

ReactDOM.render(
    <Provider store={store}>
      <App
        reviews={reviews}
      />
    </Provider>,
    document.querySelector(`#root`)
);
