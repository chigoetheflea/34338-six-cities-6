import {NameSpace} from '../root-reducer';

const getOfferLoadingStatus = (state) => state[NameSpace.OFFER].isOfferLoaded;

const getRelatedLoadingStatus = (state) => state[NameSpace.OFFER].isRelatedLoaded;

const getRelatedOffers = (state) => state[NameSpace.OFFER].relatedOffers;

const getHoveredOffer = (state) => state[NameSpace.OFFER].hoveredOffer;

const getLoadedOffer = (state) => state[NameSpace.OFFER].loadedOffer;

const getActiveOffer = (state) => state[NameSpace.OFFER].activeOffer;

export {
  getOfferLoadingStatus,
  getRelatedLoadingStatus,
  getRelatedOffers,
  getHoveredOffer,
  getLoadedOffer,
  getActiveOffer,
};
