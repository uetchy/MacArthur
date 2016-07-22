import {createStore, applyMiddleware} from 'redux';
import repositoryMiddleware from './repository/middleware';
import reducers from './reducers';

export default (initialState = {}) => {
	const middleware = applyMiddleware(repositoryMiddleware);
	const store = createStore(reducers, initialState, middleware);
	return store;
};
