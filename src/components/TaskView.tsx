import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Text, Button } from 'react-desktop/macOs'
import { shell } from 'electron'

import ghq from '../utils/ghq'

const Task: React.FC<{ url: string }> = ({ url }) => {
  const [status, setStatus] = useState<string>('Pending')
  const [statusText, setStatusText] = useState<string>('')
  const [finished, setFinished] = useState<boolean>(false)

  function openDirectory(dpath) {
    shell.openItem(dpath)
  }

  function changeStatus(status, statusText = '') {
    setStatus(status)
    setStatusText(statusText)
  }

  async function fetchRepository(url: string) {
    changeStatus('Cloning', url)
    try {
      const result = await ghq(url)
      console.log('ghq result', result)
      const repoPath = result.message[result.message.length - 1][3]
      changeStatus('Finished', repoPath)
      setFinished(true)
    } catch (err) {
      console.log('ERR', err)
      switch (err.code) {
        case 'EXISTS':
          this.changeStatus('Already exists', err.message[0][1])
          break
        default:
          this.changeStatus('Error', err.message)
      }
    }
  }

  useEffect(() => {
    console.log('Download:', url)
    fetchRepository(url)
  }, [])

  return (
    <Box label={url}>
      <Text size="16">{status}</Text>
      <Text>{statusText}</Text>
      <Button marginTop="10" onClick={() => openDirectory(statusText)}>
        Open
      </Button>
    </Box>
  )
}

export default Task
