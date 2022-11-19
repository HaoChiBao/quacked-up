import './App.css';
import React, {Component}  from 'react';
// import LandingPage from './pages/Landing';
import {LandingPage} from './pages/Landing';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {UserInfo} from './pages/UserInfo';
import LobbyPage from './pages/LobbyPage';



function App() {
  return (
    <Router>
      <div className="App">
          <Switch>
            <Route exact path='/'>
              <LandingPage/>
            </Route>
            <Route exact path='/userinfo'>
              <UserInfo/>
            </Route>
            <Route exact path = '/lobby'>
              <LobbyPage/>
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
