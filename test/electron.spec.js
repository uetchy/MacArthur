import test from 'ava'
import {Application} from 'spectron'

test.beforeEach(t => {
	t.context.app = new Application({
		path: '../node_modules/electron-prebuilt/dist/Electron.app/Contents/MacOS/Electron',
		args: ['..']
	})
	return t.context.app.start()
})

test.afterEach(t => {
	if (t.context.app && t.context.app.isRunning()) {
		return t.context.app.stop()
	}
})

test('shows an initial window', t => {
	t.context.app.client.getWindowCount().then(count => {
		t.is(count, 1)
	})
})
