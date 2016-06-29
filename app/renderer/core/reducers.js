import {combineReducers} from 'redux'
// import {routerReducer} from 'react-router-redux'

import repositoryReducer from './repository/reducer'

export default combineReducers({
  // routing: routerReducer,
  repository: repositoryReducer
})
