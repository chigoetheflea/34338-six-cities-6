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
);

const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(`/login`, {email, password})
    .then(({data}) => dispatch(ActionCreator.saveAuthInfo(data)))
    .then(() => dispatch(ActionCreator.requestAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(ActionCreator.redirectToRoute(`/`)))
);

const fetchOffer = (id) => (dispatch, _getState, api) => (
  api.get(`/hotels/${id}`)
    .then(({data}) => dispatch(ActionCreator.loadOffer(data)))
    .catch(() => dispatch(ActionCreator.redirectToRoute(`/404`)))
);

const fetchRelatedOffers = (id) => (dispatch, _getState, api) => (
  api.get(`/hotels/${id}/nearby`)
    .then(({data}) => dispatch(ActionCreator.loadRelatedOffers(data)))
);

const manageFavorite = (id, status) => (dispatch, _getState, api) => (
  api.post(`/favorite/${id}/${+status}`)
    .then(({data}) => dispatch(ActionCreator.loadOffer(data)))
);

const fetchReviews = (id) => (dispatch, _getState, api) => (
  api.get(`/comments/${id}`)
    .then(({data}) => dispatch(ActionCreator.loadReviews(data)))
);

const postReview = ({comment, rating, id}) => (dispatch, _getState, api) => (
  api.post(`/comments/${id}`, {comment, rating})
    .then(({data}) => dispatch(ActionCreator.loadReviews(data)))
    .then(() => dispatch(ActionCreator.resetReviewForm()))
    .catch(() => dispatch(ActionCreator.showReviewError()))
);

export {
  fetchOffersList,
  fetchOffer,
  fetchRelatedOffers,
  checkAuthorization,
  manageFavorite,
  login,
  fetchReviews,
  postReview,
};
