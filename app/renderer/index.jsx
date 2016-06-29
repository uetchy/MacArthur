import {ipcRenderer} from 'electron'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import configureStore from './core/store'
import {fetchRepository} from './core/repository/actions'

import Root from './components/Root'

var store = configureStore()

ipcRenderer.on('open-url', (event, gitURL) => {
  console.log('open-url', gitURL);
  store.dispatch(fetchRepository(gitURL))
})

render(
  <Provider store={store}>
    <Root store={store}/>
  </Provider>,
  document.querySelector('#root')
);
