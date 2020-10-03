import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from './Login/Login';
import { Container } from 'react-bootstrap';
import Profile from './Profile/Profile';
import NavComponent from './Profile/NavComponent';
import Lines from './Tables/Lines';
import Calls from './Tables/Calls';
import Bills from './Tables/Bills';
import NotFound from './Common/NotFound';

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
    <HashRouter>
      <Container className="App">
        {userAuth?
        <>
          <NavComponent setUserAuth = {setUserAuth}/>
          <Switch>
            <Route exact path="/profile">
              <Profile/>
            </Route>
            <Route exact path="/lines">
              <Lines/>
            </Route>
            <Route exact path="/calls">
              <Calls/>
            </Route>
            <Route exact path="/bills">
              <Bills/>
            </Route>
            <Route path="/">
              <NotFound/>
            </Route>  
          </Switch>     
        </> : 
        <>
        <Switch>
        <Route exact path="/login">
          <Login setUserAuth = {setUserAuth}/>
        </Route>
        <Route path="/">
          <Login setUserAuth = {setUserAuth}/>
        </Route>
        </Switch>   
        </>}
      </Container>         
    </HashRouter>
  );
}

export default App;
