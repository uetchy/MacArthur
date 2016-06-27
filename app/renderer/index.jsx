import React from 'react'
import {render} from 'react-dom'
import {ipcRenderer} from 'electron'
import url from 'url'
import {exec} from 'child_process'
import path from 'path'

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
    }
    console.log("Successfully cloned:", result);
  }).catch((reason) => {
    if (reason.message.includes('Repository not found')) {
      console.error("Not found:")
    } else if (reason.message.includes('ghq: command not found')) {
      console.error("ghq command not found:")
    } else if (reason.stdout.includes('"git": executable file not found')){
      console.error("git command not found:")
    } else {
      console.error("Unexpected error:", err);
    }
  })
})

function getUserHome() {
  return process.env["HOME"]
}

function ghqGet(query) {
  return new Promise((resolve, reject) => {
    exec(`ghq get '${query}'`, {
      env: {
        GHQ_ROOT: path.join(getUserHome(), 'Repos/src'),
        PATH: '/usr/bin:/usr/local/bin'
      }
    }, (err, stdout, stderr) => {
      const cleanedStdout = stdout
        .replace(/\[0;3\dm\s+/g, '')
        .replace(/\[0m/g, '')
        .split('\n')
        .filter(Boolean);
      if (err) {
        reject({
          name: err.name,
          message: err.message,
          stdout: stdout
        })
      }
      resolve({message: cleanedStdout, stdout: stdout})
    })
  })
}

render(
  <Root downloadQueue={[]}/>, document.querySelector('#root'));
