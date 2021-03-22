const ActionType = {
  CHANGE_CITY: `city/change`,
  GET_OFFERS: `city/getOffers`,
  CHANGE_SORTING: `sorting/change`,
  CHANGE_ACTIVE_OFFER: `offer/changeActive`,
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
};

export {
  ActionType,
  ActionCreator,
};
