import {exec} from 'child_process'
import path from 'path'

function getUserHome() {
  return process.env["HOME"]
}

export function ghqGet(query) {
  return new Promise((resolve, reject) => {
    exec(`ghq get '${query}'`, {
      env: {
        GHQ_ROOT: path.join(getUserHome(), 'Repos/src'),
        PATH: '/usr/bin:/usr/local/bin'
      }
    }, (err, stdout, stderr) => {
      if (err) {
        let errCode = 'UNKNOWN'
        if (err.message.includes('Repository not found')) {
          errCode = 'NFOUND'
        } else if (err.message.includes('ghq: command not found')) {
          errCode = 'GHQ_NFOUND'
        } else if (stdout.includes('"git": executable file not found')){
          errCode = 'GIT_NFOUND'
        }
        reject({
          code: errCode,
          message: err.message,
          stdout: stdout
        })
      }
      const cleanedStdout = stdout
        .replace(/\[0;3\dm\s+/g, '')
        .replace(/\[0m/g, '')
        .split('\n')
        .filter(Boolean);
      resolve({message: cleanedStdout, stdout: stdout})
    })
  })
}
