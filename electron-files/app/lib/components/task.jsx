import React, {PropTypes} from 'react'
import {Card, CardTitle, CardText} from 'material-ui/Card'

import ghq from '../utils/ghq'

export default class Task extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			status: 'Pending',
			statusText: ''
		}
	}

	changeStatus(status, statusText = '') {
		this.setState({status, statusText})
	}

	fetchRepository(url) {
		this.changeStatus('Cloning', url)
		ghq(url).then(result => {
			console.log(result)
			const repoPath = result.message[result.message.length - 1][3]
			this.changeStatus('Finished', repoPath)
		}).catch(err => {
			console.log('ERR', err)
			switch (err.code) {
				case 'EXISTS':
					this.changeStatus('Already exists', err.message[0][1])
					break
				default:
					this.changeStatus('Error', err.message)
			}
		})
	}

	componentDidMount() {
		console.log('Download:', this.props)
		this.fetchRepository(this.props.url)
	}

	render() {
		const {url} = this.props
		const {status, statusText} = this.state
		return (
			<Card>
				<CardTitle title={status} subtitle={url}/>
				<CardText>
					{statusText}
				</CardText>
			</Card>
		)
	}
}

Task.propTypes = {
	url: PropTypes.string
}
