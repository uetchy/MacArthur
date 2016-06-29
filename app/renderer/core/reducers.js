import {combineReducers} from 'redux'
import repositoryReducer from './repository/reducer'

export default combineReducers({
  repository: repositoryReducer
})
