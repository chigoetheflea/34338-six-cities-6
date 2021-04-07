import {combineReducers} from 'redux';
import {user} from './user/user';
import {offers} from './offers/offers';
import {offer} from './offer/offer';
import {reviews} from './reviews/reviews';
import {app} from './app/app';

export const NameSpace = {
  USER: `USER`,
  OFFERS: `OFFERS`,
  OFFER: `OFFER`,
  REVIEWS: `REVIEWS`,
  APP: `APP`,
};

export default combineReducers({
  [NameSpace.APP]: app,
  [NameSpace.USER]: user,
  [NameSpace.OFFERS]: offers,
  [NameSpace.OFFER]: offer,
  [NameSpace.REVIEWS]: reviews,
});
