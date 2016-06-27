import React from 'react'
import {render} from 'react-dom'
import {ipcRenderer} from 'electron'
import url from 'url'

import Root from './components/Root'

var store = {
  queue: []
}

ipcRenderer.on('open-url', handleAppURL)

function handleAppURL(event, appURL) {
  let gitURL = ''
  try {
    gitURL = url.parse(appURL).path.slice(1)
  } catch(e) {
    console.error("Isn't valid URL:", e);
    return;
  }

  store.queue.push(gitURL)
}

render(
  <Root store={store}/>, document.querySelector('#root'));
