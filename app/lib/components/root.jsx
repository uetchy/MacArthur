import React from 'react'
import {ipcRenderer} from 'electron' // eslint-disable-line import/no-extraneous-dependencies
import {Card, CardText} from 'material-ui/Card'

import Task from './task'

class Root extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			queue: []
		}
	}

	componentDidMount() {
		console.log('start listening')
		ipcRenderer.on('open-url', (event, gitURL) => {
			console.log('root open-url:', gitURL)
			const newQueue = this.state.queue
			newQueue.push(<Task key={newQueue.length + 1} url={gitURL}/>)
			this.setState({queue: newQueue})
		})
	}

	render() {
		const {queue} = this.state
		console.log(queue)
		return (
			<div>
				{queue.length > 0 ? queue : <Card>
					<CardText>No download queue</CardText>
				</Card>}
			</div>
		)
	}
}

export default Root
