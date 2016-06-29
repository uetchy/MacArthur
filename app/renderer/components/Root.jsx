import React, {PropTypes} from 'react'
import * as repositoryActions from './core/repository/actions'

import DownloadList from './DownloadList'

export default class Root extends React.Component {
  static propTypes = {
    store: PropTypes.object
  }

  componentDidMount() {
    repositoryActions.addEventListeners()
  }

  render() {
    const {store} = this.props
    console.log(store);
    return (<DownloadList downloadQueue={store.queue}/>)
  }
}
