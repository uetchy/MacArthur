import {ipcRenderer} from 'electron'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import {render} from 'react-dom';
import configureStore from './core/store';
import {fetchRepository} from './core/repository/actions';

import Root from './components/root';

const store = configureStore();

ipcRenderer.on('open-url', (event, gitURL) => {
	console.log('open-url', gitURL);
	store.dispatch(fetchRepository(gitURL));
});

render(
	<Root store={store}/>,
  document.querySelector('#root')
);
