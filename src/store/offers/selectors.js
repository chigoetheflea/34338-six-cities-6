import {NameSpace} from '../root-reducer';
import {createSelector} from 'reselect';
import {getSortedOffers, getFilteredOffersByCity} from '../../util/util';

const getDataLoadingStatus = (state) => state[NameSpace.OFFERS].isDataLoaded;

const getOffers = (state) => state[NameSpace.OFFERS].offers;

const getFavorites = (state) => state[NameSpace.OFFERS].favorites;

const getFavoritesLoadingStatus = (state) => state[NameSpace.OFFERS].isFavoritesLoaded;

const getSorting = (state) => state[NameSpace.OFFERS].sorting;

const getCity = (state) => state[NameSpace.OFFERS].city;

const getFilteredOffers = createSelector(
    [getOffers, getSorting, getCity],
    (offers, sorting, city) => getSortedOffers(getFilteredOffersByCity(offers, city), sorting)
);

export {
  getDataLoadingStatus,
  getOffers,
  getFilteredOffers,
  getSorting,
  getCity,
  getFavorites,
  getFavoritesLoadingStatus,
};
