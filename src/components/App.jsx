import React, { PureComponent } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './Header/Header';
import Main from './Main/Main';
import Join from './Join/Join';

import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

class App extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: undefined,
    }
  }

  getUserProfile = () => {
    api.getProfile()
      .then(data => {
        if (data.status === 200) {
          this.setState({ currentUser: data.user })
        }
      });
  }

  logout = () => {
    api.logout()
      .then(() => this.setState({ currentUser: undefined }));
  }

  componentDidMount() {
    this.getUserProfile();
  }

  render() {
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <Header />
        
        <Routes>
          <Route 
            path='/'
            exact
            element={ this.state.currentUser === undefined ? <Navigate replace to='/join' /> : <Main getUserProfile={this.getUserProfile} logout={this.logout} /> }  
          ></Route>

          <Route
            path='/join'
            element={ this.state.currentUser === undefined ? <Join getUserProfile={this.getUserProfile} /> : <Navigate replace to='/' /> }
          ></Route>
        </Routes>
      </CurrentUserContext.Provider>
    );
  }
}

export default App;