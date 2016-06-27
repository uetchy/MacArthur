import {
  FETCH_REPOSITORY_SUCCESS,
  FETCH_REPOSITORY_ERROR,
} from './action_types';

const initialState = {
  queue: []
};

export default function cardsReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_REPOSITORY_SUCCESS:
      return {
        ...state,
        queue: [ action.payload, ...state.queue ]
      };

    case FETCH_REPOSITORY_ERROR:
      return {
        ...state,
        isFetching: false
      };

    default:
      return state;
  }
}
