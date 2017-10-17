import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Button } from 'react-desktop/macOs';
import { shell } from 'electron';

import ghq from '../utils/ghq';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'Pending',
      statusText: '',
      finished: false
    };
  }

  openDirectory(dpath) {
    shell.openItem(dpath);
  }

  changeStatus(status, statusText = '') {
    this.setState({ status, statusText });
  }

  async fetchRepository(url) {
    this.changeStatus('Cloning', url);
    try {
      const result = await ghq(url);
      console.log('ghq result', result);
      const repoPath = result.message[result.message.length - 1][3];
      this.changeStatus('Finished', repoPath);
      this.setState({ finished: true });
    } catch (err) {
      console.log('ERR', err);
      switch (err.code) {
        case 'EXISTS':
          this.changeStatus('Already exists', err.message[0][1]);
          break;
        default:
          this.changeStatus('Error', err.message);
      }
    }
  }

  componentDidMount() {
    console.log('Download:', this.props);
    this.fetchRepository(this.props.url);
  }

  render() {
    const { url } = this.props;
    const { status, statusText, finished } = this.state;

    return (
      <Box label={url}>
        <Text size="16">{status}</Text>
        <Text>{statusText}</Text>
        <Button marginTop="10" onClick={() => this.openDirectory(statusText)}>
          Open
        </Button>
      </Box>
    );
  }
}

Task.propTypes = {
  url: PropTypes.string
};
