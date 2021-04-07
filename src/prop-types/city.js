import {shape, string} from 'prop-types';
import locationPropTypes from './location';

export default shape({
  name: string.isRequired,
  location: shape(locationPropTypes).isRequired,
});
