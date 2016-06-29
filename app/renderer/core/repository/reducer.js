import {
  REPOSITORY_FETCH_REQUESTED,
  REPOSITORY_FETCH_SUCCEEDED,
  REPOSITORY_FETCH_FAILED
} from './action-types';

const initialState = {
  gitURL: null
  isFetching: false
}

export default function repositoryReducer(state = initialState, action) {
  switch(action.type) {
    case REPOSITORY_FETCH_REQUESTED:
      return {
        gitURL: action.gitURL,
        isFetching: true
      }

    case REPOSITORY_FETCH_SUCCEEDED:
      return {
        ...state,
        isFetching: false
      }

    case REPOSITORY_FETCH_FAILED:
      return {
        ...state,
        isFetching: false
      }

    default:
      return state
  }
}
