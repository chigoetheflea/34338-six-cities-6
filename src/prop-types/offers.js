import {number, shape, string, bool, arrayOf} from 'prop-types';
import locationPropTypes from './location';

export default shape({
  bedrooms: number.isRequired,
  city: shape({
    location: shape(locationPropTypes).isRequired,
    name: string.isRequired,
  }).isRequired,
  description: string.isRequired,
  goods: arrayOf(string).isRequired,
  host: shape({
    avatarUrl: string,
    id: number.isRequired,
    isPro: bool.isRequired,
    name: string.isRequired
  }).isRequired,
  id: number.isRequired,
  images: arrayOf(string).isRequired,
  isFavorite: bool.isRequired,
  isPremium: bool.isRequired,
  location: shape(locationPropTypes).isRequired,
  maxAdults: number.isRequired,
  previewImage: string.isRequired,
  price: number.isRequired,
  rating: number.isRequired,
  title: string.isRequired,
  type: string.isRequired,
});
