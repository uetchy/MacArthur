import path from 'path';
import {exec} from 'child_process';
import Promise from 'bluebird';

const execAsync = Promise.promisifyAll(exec);

function getUserHome() {
	return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}

export function ghqGet(query) {
	return new Promise((resolve, reject) => {
		execAsync(`ghq get '${query}'`, {
			env: {
				GHQ_ROOT: path.join(getUserHome(), 'Repos/src'),
				PATH: '/usr/bin:/usr/local/bin'
			}
		}).then(stdout => {
			const cleanedStdout = stdout
				.replace(/\[0;3\dm\s+/g, '')
				.replace(/\[0m/g, '')
				.split('\n')
				.filter(Boolean);
			resolve({message: cleanedStdout, stdout});
		}).catch(err => {
			let errCode = 'UNKNOWN';
			if (err.message.includes('Repository not found')) {
				errCode = 'NFOUND';
			} else if (err.message.includes('ghq: command not found')) {
				errCode = 'GHQ_NFOUND';
			} else if (err.includes('"git": executable file not found')) {
				errCode = 'GIT_NFOUND';
			} else {
				errCode = 'UNKNOWN_ERROR';
			}
			reject({
				code: errCode,
				message: err.message
			});
		});
	});
}
