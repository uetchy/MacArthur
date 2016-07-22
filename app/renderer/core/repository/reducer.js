import {
	REPOSITORY_FETCH_REQUESTED,
	REPOSITORY_FETCH_SUCCEEDED,
	REPOSITORY_FETCH_FAILED
} from './action-types';

const initialState = {
	gitURL: null,
	result: null,
	isFetching: false
};

export default function repositoryReducer(state = initialState, action) {
	switch (action.type) {
		case REPOSITORY_FETCH_REQUESTED:
			console.log('REPOSITORY_FETCH_REQUESTED', action);
			return {
				gitURL: action.gitURL,
				isFetching: true
			};

		case REPOSITORY_FETCH_SUCCEEDED:
			return {
				...state,
				result: action.payload,
				isFetching: false
			};

		case REPOSITORY_FETCH_FAILED:
			return {
				...state,
				result: action.payload,
				isFetching: false
			};

		default:
			return state;
	}
}
