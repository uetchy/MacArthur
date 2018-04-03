import React from 'react'
import { ipcRenderer } from 'electron'
import { Label, View } from 'react-desktop/macOs'

import Task from './task'

class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      queue: [],
    }
  }

  componentDidMount() {
    console.log('start listening')
    ipcRenderer.on('open-url', (event, gitURL) => {
      console.log('root open-url:', gitURL)
      const newQueue = this.state.queue
      newQueue.push(<Task key={newQueue.length + 1} url={gitURL} />)
      this.setState({ queue: newQueue })
    })
  }

  render() {
    const { queue } = this.state
    console.log(queue)
    return (
      <View background="white" height="100%" horizontalAlignment="center" padding="10px">
        {queue.length > 0 ? queue : <Label textAlign="center">No download queue</Label>}
      </View>
    )
  }
}

export default Root
