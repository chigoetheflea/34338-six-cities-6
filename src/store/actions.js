const ActionType = {
  CHANGE_CITY: `city/change`,
  GET_OFFERS: `city/getOffers`,
  CHANGE_SORTING: `sorting/change`,
  CHANGE_HOVERED_OFFER: `offer/changeHovered`,
  CHANGE_ACTIVE_OFFER: `offer/changeActive`,
  REQUEST_AUTHORIZATION: `user/requestAuthorization`,
  LOAD_OFFERS: `offers/load`,
  CLEAR_OFFERS: `offers/clear`,
  ADAPT_OFFERS: `offers/adapt`,
  SAVE_AUTH_INFO: `user/login`,
  REDIRECT_TO_ROUTE: `app/redirect`,
  LOAD_OFFER: `offer/load`,
  CLEAR_LOADED_OFFER: `offer/clear`,
  LOAD_RELATED_OFFERS: `related/load`,
  LOAD_REVIEWS: `reviews/load`,
  RESET_REVIEW_FORM: `review/reset`,
  SHOW_REVIEW_ERROR: `review/showError`,
  CLEAR_REVIEW_FORM_STATUS: `review/clearFormStatus`,
};

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),
  getOffers: () => ({
    type: ActionType.GET_OFFERS,
  }),
  changeSorting: (sortingType) => ({
    type: ActionType.CHANGE_SORTING,
    payload: sortingType,
  }),
  changeHoveredOffer: (id) => ({
    type: ActionType.CHANGE_HOVERED_OFFER,
    payload: id,
  }),
  changeActiveOffer: (id) => ({
    type: ActionType.CHANGE_ACTIVE_OFFER,
    payload: id,
  }),
  requestAuthorization: (status) => ({
    type: ActionType.REQUEST_AUTHORIZATION,
    payload: status,
  }),
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  }),
  clearOffers: () => ({
    type: ActionType.CLEAR_OFFERS,
  }),
  saveAuthInfo: (info) => ({
    type: ActionType.SAVE_AUTH_INFO,
    payload: info,
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  }),
  loadOffer: (info) => ({
    type: ActionType.LOAD_OFFER,
    payload: info,
  }),
  clearLoadedOffer: () => ({
    type: ActionType.CLEAR_LOADED_OFFER,
  }),
  loadRelatedOffers: (offers) => ({
    type: ActionType.LOAD_RELATED_OFFERS,
    payload: offers,
  }),
  loadReviews: (reviews) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: reviews,
  }),
  resetReviewForm: () => ({
    type: ActionType.RESET_REVIEW_FORM,
  }),
  showReviewError: () => ({
    type: ActionType.SHOW_REVIEW_ERROR,
  }),
  clearReviewFormStatus: () => ({
    type: ActionType.CLEAR_REVIEW_FORM_STATUS,
  }),
};

export {
  ActionType,
  ActionCreator,
};
