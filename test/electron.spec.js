import test from 'ava'
import { Application } from 'spectron'
import electronPath from 'electron'
import path from 'path'

test.beforeEach(t => {
  t.context.app = new Application({
    path: electronPath,
    args: [path.join(__dirname, '..')],
  })
  return t.context.app.start()
})

test.afterEach(t => {
  if (t.context.app && t.context.app.isRunning()) {
    return t.context.app.stop()
  }
})

test('shows an initial window', async t => {
  const app = t.context.app
  const count = await app.client.waitUntilWindowLoaded().getWindowCount()
  t.is(count, 1)
})
