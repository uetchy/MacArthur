import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { Box, Text, Button } from 'react-desktop/macOs';

import cp from 'child_process';
import Promise from 'bluebird';
const { execAsync } = Promise.promisifyAll(cp);

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
  	execAsync(`open '${dpath}'`)
  }

  changeStatus(status, statusText = '') {
    this.setState({ status, statusText });
  }

  fetchRepository(url) {
    this.changeStatus('Cloning', url);
    ghq(url)
      .then(result => {
        console.log('ghq result', result);
        const repoPath = result.message[result.message.length - 1][3];
        this.changeStatus('Finished', repoPath);
        this.setState({ finished: true });
      })
      .catch(err => {
        console.log('ERR', err);
        switch (err.code) {
          case 'EXISTS':
            this.changeStatus('Already exists', err.message[0][1]);
            break;
          default:
            this.changeStatus('Error', err.message);
        }
      });
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
        <Button marginTop="10" onClick={() => this.openDirectory(statusText)}>Open</Button>
      </Box>
    );
  }
}

Task.propTypes = {
  url: PropTypes.string
};
