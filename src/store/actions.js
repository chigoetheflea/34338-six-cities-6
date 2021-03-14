const ActionType = {
  CHANGE_CITY: `city/change`,
  GET_OFFERS: `city/getOffers`,
};

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),
  getOffers: () => ({
    type: ActionType.GET_OFFERS,
  }),
};

export {
  ActionType,
  ActionCreator,
};
