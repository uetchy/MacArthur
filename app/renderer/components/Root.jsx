import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import Download from './Download'

class Root extends React.Component {
  static propTypes = {
    gitURL: PropTypes.string
  }

  render() {
    const {gitURL} = this.props
    return (
      <div>
        <h1>{gitURL}</h1>
      </div>
    )
  }
}

export default connect(state => ({
  gitURL: state.repository.gitURL
}))(Root)
