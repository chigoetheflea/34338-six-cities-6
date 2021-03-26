import {ActionCreator} from '../store/actions';
import {AuthorizationStatus} from '../util/const';

const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(`/hotels`)
    .then(({data}) => dispatch(ActionCreator.loadOffers(data)))
    .then(({data}) => dispatch(ActionCreator.getOffers(data)))
);

const checkAuthorization = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then(({data}) => dispatch(ActionCreator.saveAuthInfo(data)))
    .then(() => dispatch(ActionCreator.requestAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(`/login`, {email, password})
    .then(({data}) => dispatch(ActionCreator.saveAuthInfo(data)))
    .then(() => dispatch(ActionCreator.requestAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(ActionCreator.redirectToRoute(`/`)))
);

export {
  fetchOffersList,
  checkAuthorization,
  login,
};
