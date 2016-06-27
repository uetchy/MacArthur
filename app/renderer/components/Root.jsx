import React, {PropTypes} from 'react'

import DownloadList from './DownloadList'

export default class Root extends React.Component {
  static propTypes = {
    downloadQueue: PropTypes.array
  }

  render() {
    return (<DownloadList downloadQueue={this.props.downloadQueue}/>)
  }
}
