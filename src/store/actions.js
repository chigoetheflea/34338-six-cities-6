const ActionType = {
  CHANGE_CITY: `city/change`,
  GET_OFFERS: `city/getOffers`,
  CHANGE_SORTING: `sorting/change`,
  CHANGE_ACTIVE_OFFER: `offer/changeActive`,
  REQUEST_AUTHORIZATION: `user/requestAuthorization`,
  LOAD_OFFERS: `offers/load`,
  ADAPT_OFFERS: `offers/adapt`,
  SAVE_AUTH_INFO: `user/login`,
  REDIRECT_TO_ROUTE: `app/redirect`,
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
  saveAuthInfo: (info) => ({
    type: ActionType.SAVE_AUTH_INFO,
    payload: info,
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  }),
};

export {
  ActionType,
  ActionCreator,
};
