import React from 'react';
import { render } from 'react-dom';
import { TitleBar, Toolbar, Text } from 'react-desktop/macOs';

import Root from './components/root';

const App = () => (
  <div>
    <TitleBar inset>
      <Toolbar height="38" horizontalAlignment="center">
        <Text>MacArthur</Text>
      </Toolbar>
    </TitleBar>
    <Root />
  </div>
);

render(<App />, document.querySelector('#root'));
