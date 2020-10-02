import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from './Login/Login';
import { Container } from 'react-bootstrap';
import Profile from './Profile/Profile';
import NavComponent from './Profile/NavComponent';
import Lines from './Tables/Lines';
import Calls from './Tables/Calls';
import Bills from './Tables/Bills';

function App() {
  let [userAuth, setUserAuth] = useState(false);
  useEffect(() => {
    let id = localStorage.getItem('id');
    let token = localStorage.getItem('token');
    if (id && token) {
      setUserAuth(true);
    }  
  });

  return (
    <BrowserRouter>
      <Container className="App">
        {userAuth?
        <>
          <NavComponent setUserAuth = {setUserAuth}/>
          <Route path="/profile">
            <Profile/>
          </Route>
          <Route path="/lines">
          <Lines/>
          </Route>
          <Route path="/calls">
            <Calls/>
          </Route>
          <Route path="/bills">
            <Bills/>
          </Route>
        </> : 
        <>
        <Route path="/login">
          <Login setUserAuth = {setUserAuth}/>
        </Route>
        </>}
      </Container>         
    </BrowserRouter>
  );
}

export default App;
