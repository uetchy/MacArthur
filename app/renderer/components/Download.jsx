import React, {PropTypes} from 'react'

export default class Download extends React.Component {
  static propTypes = {
    status: PropTypes.string,
    statusText: PropTypes.string,
    gitURL: PropTypes.string
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
