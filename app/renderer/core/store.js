import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export default (initialState = {}) => {
  let middleware = applyMiddleware(thunk);

  const store = createStore(reducers, initialState, middleware);

  return store;
};
