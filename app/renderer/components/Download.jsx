import React, {PropTypes} from 'react'
import {ghqGet} from '../../ghq'

export default class Download extends React.Component {
  static propTypes = {
    status: PropTypes.string,
    statusText: PropTypes.string,
    gitURL: PropTypes.string
  }

  componentDidMount() {
    console.log("Download:", this.props);
    // fetchRepository(this.props.gitURL);
  }

  render() {
    const {status, statusText, gitURL} = this.props
    return (
      <div className="download">
        <span>{status}</span>
        <dl>
          <dt>{gitURL}</dt>
          <dd>{statusText}</dd>
        </dl>
      </div>
    )
  }
}
