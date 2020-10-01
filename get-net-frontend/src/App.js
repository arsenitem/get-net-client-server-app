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

function App() {
  let [userAuth, setUserAuth] = useState(false)
  let [user, setUser] = useState({});

  useEffect(() => {
    let id = localStorage.getItem('id');
    let token = localStorage.getItem('token');
    if (id && token) {
      setUserAuth(true);
    }  
  })

  return (
    <BrowserRouter>
    
    <Container className="App">
        {userAuth?
          <>
          <NavComponent user={user} setUserAuth = {setUserAuth}/>
          <Route path="/profile">
            <Profile user={user} setUser={setUser}/>
          </Route>
          <Route path="/lines">
          <Lines/>
          </Route>
          <Route path="/calls">
            <Calls/>
          </Route>

        </> :  <>
      <Route path="/login">
          <Login setUserAuth = {setUserAuth} setUser={setUser}/>
        </Route></>}
        </Container>
    
       
       
     
    </BrowserRouter>
  
  );
}

export default App;
