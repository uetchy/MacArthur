import {createStore, applyMiddleware} from 'redux'
// import thunk from 'redux-thunk'
import repositoryMiddleware from './repository/middleware'
import reducers from './reducers'

export default (initialState = {}) => {
  let middleware = applyMiddleware(repositoryMiddleware)
  const store = createStore(reducers, initialState, middleware)
  return store
}
