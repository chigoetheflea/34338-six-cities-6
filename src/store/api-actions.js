import browserHistory from '../services/browser-history';
import {
  loadOffers,
  saveAuthInfo,
  requestAuthorization,
  loadOffer,
  loadRelatedOffers,
  loadReviews,
  resetReviewForm,
  showReviewError,
  loadFavorites,
  showLoginError,
  checkUserAuthorization
} from '../store/actions';
import {AuthorizationStatus, Path} from '../util/const';

const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(Path.OFFERS)
    .then(({data}) => dispatch(loadOffers(data)))
);

const fetchFavoritesList = () => (dispatch, _getState, api) => (
  api.get(Path.FAVORITE)
    .then(({data}) => dispatch(loadFavorites(data)))
);

const checkAuthorization = () => (dispatch, _getState, api) => (
  api.get(Path.LOGIN)
  .then(({data}) => dispatch(saveAuthInfo(data)))
  .then(() => dispatch(requestAuthorization(AuthorizationStatus.AUTH)))
  .then(() => dispatch(checkUserAuthorization()))
);

const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(Path.LOGIN, {email, password})
    .then(({data}) => dispatch(saveAuthInfo(data)))
    .then(() => dispatch(requestAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(checkUserAuthorization()))
    .then(() => browserHistory.push(Path.HOME))
    .catch(() => dispatch(showLoginError()))
);

const fetchOffer = (id) => (dispatch, _getState, api) => (
  api.get(`${Path.OFFERS}/${id}`)
    .then(({data}) => dispatch(loadOffer(data)))
    .catch(() => browserHistory.push(Path.PAGE_404))
);

const fetchRelatedOffers = (id) => (dispatch, _getState, api) => (
  api.get(`${Path.OFFERS}/${id}/nearby`)
    .then(({data}) => dispatch(loadRelatedOffers(data)))
);

const manageFavorite = (id, status) => (dispatch, _getState, api) => (
  api.post(`${Path.FAVORITE}/${id}/${+status}`)
    .then(({data}) => dispatch(loadOffer(data)))
);

const fetchReviews = (id) => (dispatch, _getState, api) => (
  api.get(`${Path.REVIEWS}/${id}`)
    .then(({data}) => dispatch(loadReviews(data)))
);

const postReview = ({comment, rating, id}) => (dispatch, _getState, api) => (
  api.post(`${Path.REVIEWS}/${id}`, {comment, rating})
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
