import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Login from 'login/LoginView';
import { store } from './reduxInit';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className="main">
          <Login/>
        </div>
      </Provider>
    );
  }
}

export default App;
