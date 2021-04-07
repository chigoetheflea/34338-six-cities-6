import {ActionType} from '../actions';

const initialState = {
  isServerAvailable: null,
};

const app = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case ActionType.CHECK_SERVER:
      return {
        ...state,
        isServerAvailable: payload,
      };
  }

  return state;
};

export {app};
