import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from './Login/Login';
import { Container } from 'react-bootstrap';
import Profile from './Profile/Profile';
import NavComponent from './Profile/NavComponent';
import Lines from './Tables/Lines';
import NotFound from './Common/NotFound';
import Calls from './Tables/Calls';

function App() {
  let [userAuth, setUserAuth] = useState(false)
  let [user, setUser] = useState({});
  return (
    <BrowserRouter>
    
    <Container className="App">
        <Route path="/">
          <Redirect to="/login" />
        </Route>
        {userAuth?
          <>
          <NavComponent user={user}/>
          <Route path="/profile">
            <Profile user={user} setUser={setUser}/>
          </Route>
          <Route path="/lines">
          <Lines/>
          </Route>
          <Route path="/calls">
            <Calls/>
          </Route>

        </> : null}
        <Route path="/login">
          <Login setUserAuth = {setUserAuth} setUser={setUser}/>
        </Route>
        </Container>
    
       
       
     
    </BrowserRouter>
  
  );
}

export default App;
