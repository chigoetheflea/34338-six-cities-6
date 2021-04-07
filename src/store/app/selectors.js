import {NameSpace} from '../root-reducer';

const getServerAvailability = (state) => state[NameSpace.APP].isServerAvailable;

export {
  getServerAvailability,
};
