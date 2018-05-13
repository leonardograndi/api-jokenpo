import React, { Component } from 'react';
import Login from './Login/Login';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const wrapper = getMuiTheme({});

class App extends Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={wrapper}>
      <div>
        <Login />



      </div>
      </MuiThemeProvider>
    );
  }
}
export default App;
