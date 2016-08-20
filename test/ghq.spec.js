import test from 'ava'

import ghqGet from '../app/lib/utils/ghq'

test('ghq get', t => {
	ghqGet('https://github.com/uetchy/MacArthur')
		.then(result => {
			t.pass(result)
		})
		.catch(err => {
			t.fail(err)
		})
})
