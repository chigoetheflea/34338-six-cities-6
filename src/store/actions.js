const ActionType = {
  REDIRECT_TO_ROUTE: `app/redirect`,
  REQUEST_AUTHORIZATION: `user/requestAuthorization`,
  SAVE_AUTH_INFO: `user/login`,
  CHANGE_CITY: `city/change`,
  GET_OFFERS: `offers/getOffers`,
  CHANGE_SORTING: `offers/changeSorting`,
  LOAD_OFFERS: `offers/load`,
  CLEAR_OFFERS: `offers/clear`,
  LOAD_FAVORITES: `offers/loadFavorites`,
  CLEAR_FAVORITES: `offers/clearFavorites`,
  LOAD_OFFER: `offer/load`,
  CHANGE_ACTIVE_OFFER: `offer/changeActive`,
  CHANGE_HOVERED_OFFER: `offer/changeHovered`,
  CLEAR_LOADED_OFFER: `offer/clear`,
  LOAD_RELATED_OFFERS: `offer/loadRelated`,
  LOAD_REVIEWS: `reviews/load`,
  RESET_REVIEW_FORM: `reviews/resetForm`,
  SHOW_REVIEW_ERROR: `reviews/showPostError`,
  CLEAR_REVIEW_FORM_STATUS: `reviews/clearFormStatus`,
};

const changeCity = (city) => ({
  type: ActionType.CHANGE_CITY,
  payload: city,
});

const getOffers = () => ({
  type: ActionType.GET_OFFERS,
});

const changeSorting = (sortingType) => ({
  type: ActionType.CHANGE_SORTING,
  payload: sortingType,
});

const changeHoveredOffer = (id) => ({
  type: ActionType.CHANGE_HOVERED_OFFER,
  payload: id,
});

const changeActiveOffer = (id) => ({
  type: ActionType.CHANGE_ACTIVE_OFFER,
  payload: id,
});

const requestAuthorization = (status) => ({
  type: ActionType.REQUEST_AUTHORIZATION,
  payload: status,
});

const loadOffers = (offers) => ({
  type: ActionType.LOAD_OFFERS,
  payload: offers,
});

const loadFavorites = (offers) => ({
  type: ActionType.LOAD_FAVORITES,
  payload: offers,
});

const clearFavorites = () => ({
  type: ActionType.CLEAR_FAVORITES,
});


const clearOffers = () => ({
  type: ActionType.CLEAR_OFFERS,
});

const saveAuthInfo = (info) => ({
  type: ActionType.SAVE_AUTH_INFO,
  payload: info,
});

const redirectToRoute = (url) => ({
  type: ActionType.REDIRECT_TO_ROUTE,
  payload: url,
});

const loadOffer = (info) => ({
  type: ActionType.LOAD_OFFER,
  payload: info,
});

const clearLoadedOffer = () => ({
  type: ActionType.CLEAR_LOADED_OFFER,
});

const loadRelatedOffers = (offers) => ({
  type: ActionType.LOAD_RELATED_OFFERS,
  payload: offers,
});

const loadReviews = (reviews) => ({
  type: ActionType.LOAD_REVIEWS,
  payload: reviews,
});

const resetReviewForm = () => ({
  type: ActionType.RESET_REVIEW_FORM,
});

const showReviewError = () => ({
  type: ActionType.SHOW_REVIEW_ERROR,
});

const clearReviewFormStatus = () => ({
  type: ActionType.CLEAR_REVIEW_FORM_STATUS,
});

export {
  ActionType,
  changeCity,
  getOffers,
  changeSorting,
  changeHoveredOffer,
  changeActiveOffer,
  requestAuthorization,
  loadOffers,
  clearOffers,
  saveAuthInfo,
  redirectToRoute,
  loadOffer,
  clearLoadedOffer,
  loadRelatedOffers,
  loadReviews,
  resetReviewForm,
  showReviewError,
  clearReviewFormStatus,
  loadFavorites,
  clearFavorites,
};
