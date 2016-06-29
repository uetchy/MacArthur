import React from 'react'
import {render} from 'react-dom'
import configureStore from './lib/store';

import Root from './components/Root'

var store = configureStore()

render(
  <Root store={store}/>,
  document.querySelector('#root')
);
