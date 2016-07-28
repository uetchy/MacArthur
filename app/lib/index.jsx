import {ipcRenderer} from 'electron' // eslint-disable-line import/no-extraneous-dependencies
import React from 'react'
import {render} from 'react-dom'

import ghq from './utils/ghq'
import Root from './components/root'

let targetURL

function ghqGet(url) {
	ghq(url).then(result => {
		console.log(result)
	})
}

ipcRenderer.on('open-url', (event, gitURL) => {
	console.log('open-url', gitURL)
	targetURL = gitURL
	ghqGet(targetURL)
})

render(
	<Root gitURL={targetURL}/>,
  document.querySelector('#root')
)
