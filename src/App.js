import './App.css';
import React, {Component}  from 'react';
// import LandingPage from './pages/Landing';
import {LandingPage} from './pages/Landing';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import UserInfo from './pages/UserInfo';



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
          </Switch>
      </div>
    </Router>
  );
}

export default App;
