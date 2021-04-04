import {
  loadOffers,
  getOffers,
  saveAuthInfo,
  requestAuthorization,
  redirectToRoute,
  loadOffer,
  loadRelatedOffers,
  loadReviews,
  resetReviewForm,
  showReviewError,
  loadFavorites,
} from '../store/actions';
import {AuthorizationStatus} from '../util/const';

const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(`/hotels`)
    .then(({data}) => dispatch(loadOffers(data)))
    .then(({data}) => dispatch(getOffers(data)))
);

const fetchFavoritesList = () => (dispatch, _getState, api) => (
  api.get(`/favorite`)
    .then(({data}) => dispatch(loadFavorites(data)))
);

const checkAuthorization = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then(({data}) => dispatch(saveAuthInfo(data)))
    .then(() => dispatch(requestAuthorization(AuthorizationStatus.AUTH)))
);

const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(`/login`, {email, password})
    .then(({data}) => dispatch(saveAuthInfo(data)))
    .then(() => dispatch(requestAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(redirectToRoute(`/`)))
);

const fetchOffer = (id) => (dispatch, _getState, api) => (
  api.get(`/hotels/${id}`)
    .then(({data}) => dispatch(loadOffer(data)))
    .catch(() => dispatch(redirectToRoute(`/404`)))
);

const fetchRelatedOffers = (id) => (dispatch, _getState, api) => (
  api.get(`/hotels/${id}/nearby`)
    .then(({data}) => dispatch(loadRelatedOffers(data)))
);

const manageFavorite = (id, status) => (dispatch, _getState, api) => (
  api.post(`/favorite/${id}/${+status}`)
    .then(({data}) => dispatch(loadOffer(data)))
);

const fetchReviews = (id) => (dispatch, _getState, api) => (
  api.get(`/comments/${id}`)
    .then(({data}) => dispatch(loadReviews(data)))
);

const postReview = ({comment, rating, id}) => (dispatch, _getState, api) => (
  api.post(`/comments/${id}`, {comment, rating})
    .then(({data}) => dispatch(loadReviews(data)))
    .then(() => dispatch(resetReviewForm()))
    .catch(() => dispatch(showReviewError()))
);

export {
  fetchOffersList,
  fetchFavoritesList,
  fetchOffer,
  fetchRelatedOffers,
  checkAuthorization,
  manageFavorite,
  login,
  fetchReviews,
  postReview,
};
