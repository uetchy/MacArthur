import {
  REPOSITORY_FETCH_REQUESTED,
  REPOSITORY_FETCH_SUCCEEDED,
  REPOSITORY_FETCH_FAILED
} from './action-types'

export function fetchRepository(gitURL) {
  return {
    type: REPOSITORY_FETCH_REQUESTED,
    gitURL
  }
}
