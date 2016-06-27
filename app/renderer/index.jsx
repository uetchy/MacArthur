import React from 'react'
import {render} from 'react-dom'
import {ipcRenderer} from 'electron'
import url from 'url'
import {exec} from 'child_process'

import Root from './components/Root'

ipcRenderer.on('open-url', (event, argURL) => {
  const gitURL = url.parse(argURL).path.slice(1)
  console.log(gitURL)
  if (gitURL) {
    cloneGitRepository(gitURL).then((result) => {
      console.log(result);
    })
  }
})

function cloneGitRepository(gitURL) {
  return Promise((resolve, reject) => {
    exec(`ghq get '${gitURL}'`, {
      env: {
        GHQ_ROOT: '/Users/uetchy/Repos/src',
        PATH: '/usr/bin:/usr/local/bin'
      }
    }, (err, stdout, stderr) => {
      if (err) {
        console.error(err, stdout)
        return
      }
      console.log(stdout)
    })
  })
}

render(
  <Root downloadQueue={[]}/>, document.querySelector('#root')
);
