import React, {PropTypes} from 'react'

import Download from './Download'

export default class DownloadList extends React.Component {
  static propTypes = {
    downloadQueue: PropTypes.array
  }

  render() {
    const {downloadQueue} = this.props
    const downloadList = downloadQueue.map((queue) => {
      return (<Download {...queue}/>)
    })
    console.log(downloadList);
    return (
      <div className="download-list">
        {downloadList}
      </div>
    )
  }
}
