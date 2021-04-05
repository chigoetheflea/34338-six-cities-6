import {combineReducers} from 'redux';
import {user} from './user/user';
import {offers} from './offers/offers';
import {offer} from './offer/offer';
import {reviews} from './reviews/reviews';

export const NameSpace = {
  USER: `USER`,
  OFFERS: `OFFERS`,
  OFFER: `OFFER`,
  REVIEWS: `REVIEWS`,
};

export default combineReducers({
  [NameSpace.USER]: user,
  [NameSpace.OFFERS]: offers,
  [NameSpace.OFFER]: offer,
  [NameSpace.REVIEWS]: reviews,
});
