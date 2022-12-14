import './App.css';
import React, {Component}  from 'react';
// import LandingPage from './pages/Landing';
import {LandingPage} from './pages/Landing';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {UserInfo} from './pages/UserInfo';
import LobbyPage from './pages/LobbyPage';
import VotingPage from './pages/VotingPage.js'
import DDG from './pages/duckDuckGoose'
import DIG from './pages/duckstagram'
import Duck from './pages/Duck.js'
import Goose from './pages/Goose.js'

import Title from './pages/Title';



function App() {
  return (
    <Router>
      <div className="App">
          <Switch>
            <Route exact path = '/'>
              <Title/>
            </Route>
            
            <Route exact path='/landing'>
              <LandingPage/>
            </Route>

            <Route exact path='/userinfo'>
              <UserInfo/>
            </Route>

            <Route exact path = '/lobby'>
              <LobbyPage/>
            </Route>

            <Route exact path = '/voting'>
              <VotingPage/>
            </Route> 

            <Route exact path = '/ddg'>
              <DDG/>
            </Route>
            
            <Route exact path = '/dig'>
              <DIG/>
            </Route>

            <Route exact path = '/duck'>
              <Duck/>
            </Route>

            <Route exact path = '/goose'>
              <Goose/>
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
