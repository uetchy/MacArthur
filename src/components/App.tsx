import React, { useEffect, useState } from 'react'
import { ipcRenderer } from 'electron'
import { Label, View, TitleBar, Toolbar, Text } from 'react-desktop/macOs'

import TaskView from './TaskView'

const Navigation: React.FC = () => {
  return (
    <TitleBar inset>
      <Toolbar height="15" horizontalAlignment="center">
        <Text>MacArthur</Text>
      </Toolbar>
    </TitleBar>
  )
}

const App: React.FC = () => {
  const [queue, setQueue] = useState([])

  useEffect(() => {
    console.log('start listening')
    ipcRenderer.on('open-url', (event, gitURL) => {
      console.log('root open-url:', event, gitURL)
      setQueue((prevQueue) => [...prevQueue, <TaskView url={gitURL} />])
    })
  }, [])

  return (
    <>
      <Navigation />
      <View
        background="white"
        height="100%"
        horizontalAlignment="center"
        padding="10px">
        {queue.length > 0 ? (
          queue.map((Component, i) => <Component key={i} />)
        ) : (
          <Label textAlign="center">No download queue</Label>
        )}
      </View>
    </>
  )
}

export default App
