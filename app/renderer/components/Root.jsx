import React, {PropTypes} from 'react'

import DownloadList from './DownloadList'

export default class Root extends React.Component {
  static propTypes = {
    store: PropTypes.object
  }

  render() {
    const {store} = this.props
    console.log(store);
    return (<DownloadList downloadQueue={store.queue}/>)
  }
}
