import {ActionCreator} from '../store/actions';

const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(`/hotels`)
    .then(({data}) => dispatch(ActionCreator.loadOffers((data))))
    .then(({data}) => dispatch(ActionCreator.getOffers((data))))
);

export {
  fetchOffersList,
};
