import {ghqGet} from './ghq';
import {
	REPOSITORY_FETCH_REQUESTED,
	REPOSITORY_FETCH_SUCCEEDED,
	REPOSITORY_FETCH_FAILED
} from './action-types';

const fetchRepositoryMiddleware = store => next => action => {
	if (action.type === REPOSITORY_FETCH_REQUESTED) {
		ghqGet(action.gitURL).then(result => {
			store.dispatch({
				type: REPOSITORY_FETCH_SUCCEEDED,
				payload: result
			});
		}).catch(err => {
			store.dispatch({
				type: REPOSITORY_FETCH_FAILED,
				payload: err
			});
		});
	}
	return next(action);
};

export default fetchRepositoryMiddleware;
