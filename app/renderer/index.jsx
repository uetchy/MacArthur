import React from 'react'
import {render} from 'react-dom'
import {ipcRenderer} from 'electron'
import url from 'url'
import {ghqGet} from '../ghq'

import Root from './components/Root'

ipcRenderer.on('open-url', (event, appProtocolURL) => {
  let gitURL = ''
  try {
    gitURL = url.parse(appProtocolURL).path.slice(1)
  } catch(e) {
    console.error("Isn't valid URL:", e);
    return;
  }
  ghqGet(gitURL).then((result) => {
    if (result.stdout.includes("exists")) {
      console.log("Exist:");
      return;
    }
    console.log("Successfully cloned:", result);
  }).catch((err) => {
    switch(err.code) {
      case 'NFOUND':
        console.error("Not found:");
        break;
      case 'GHQ_NFOUND':
        console.error("ghq command not found:")
        break;
      case 'GIT_NFOUND':
        console.error("git command not found:")
        break;
      default:
        console.error("Unexpected error:", err);
    }
  })
})

render(
  <Root downloadQueue={[]}/>, document.querySelector('#root'));
