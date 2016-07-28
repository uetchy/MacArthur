import React, {PropTypes} from 'react'

// import Download from './download'

class Root extends React.Component {
	render() {
		const {gitURL} = this.props
		return (
			<div>
				<h1>{gitURL}</h1>
			</div>
		)
	}
}

Root.propTypes = {
	gitURL: PropTypes.string
}

export default Root
