import {
	REPOSITORY_FETCH_REQUESTED
} from './action-types';

export function fetchRepository(gitURL) {
	return {
		type: REPOSITORY_FETCH_REQUESTED,
		gitURL
	};
}
