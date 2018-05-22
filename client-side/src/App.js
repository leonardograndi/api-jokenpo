import React, { Component } from 'react';

import Login from './Login/Login';
import Register from './Register/Register';
import Game from './Game/Game';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { history } from './_helpers';

const wrapper = getMuiTheme({});

class App extends Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={wrapper}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/" component={Game} />
          </Switch>
        </ConnectedRouter>
      </MuiThemeProvider>
    );
  }
}
export default App;
