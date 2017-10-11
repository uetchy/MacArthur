import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Root from './components/root';

injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider>
    <Root />
  </MuiThemeProvider>
);

render(<App />, document.querySelector('#root'));
