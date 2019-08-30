import path from 'path'
import { execSync } from 'child_process'

function getUserHome() {
  return process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME']
}

interface GhqResult {
  message: string[][]
  stdout: Buffer
}

export default function get(query): Promise<GhqResult> {
  return new Promise((resolve, reject) => {
    try {
      const stdout = execSync(`ghq get '${query}'`, {
        env: {
          GHQ_ROOT: path.join(getUserHome(), 'Repos/src'),
          PATH: '/usr/bin:/usr/local/bin',
        },
      })
      console.log('stdout', stdout)
      const parsedStdout = stdout
        .toString()
        .replace(/\[0;\d{2}m\s+/g, '')
        .replace(/\[0m/g, '')
        .split('\n')
        .filter(Boolean)
        .map((line) => line.split(' '))
      if (stdout.includes('exists')) {
        return reject({
          code: 'EXISTS',
          message: parsedStdout,
        })
      }
      resolve({ message: parsedStdout, stdout })
    } catch (err) {
      let errCode = 'UNKNOWN'
      if (err.message.includes('Repository not found')) {
        errCode = 'NFOUND'
      } else if (err.message.includes('ghq: command not found')) {
        errCode = 'GHQ_NFOUND'
      } else if (err.includes('"git": executable file not found')) {
        errCode = 'GIT_NFOUND'
      }
      reject({
        code: errCode,
        message: [[err.message]],
      })
    }
  })
}
