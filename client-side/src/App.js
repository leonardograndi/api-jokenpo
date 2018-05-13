import React, { Component } from 'react';
import Login from './Login/Login';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { history } from './_helpers/history';

const wrapper = getMuiTheme({});

class App extends Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={wrapper}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={Login} />
          </Switch>
        </ConnectedRouter>
      </MuiThemeProvider>
    );
  }
}
export default App;
