import React from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

function NavComponent(props) {
    function logout() {
      props.setUserAuth(false);
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      props.history.push("/login");
    }
    return (
        <div className="Nav">
            <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="">GET-NET-TEST</Navbar.Brand>
    <Nav className="mr-auto">
        <Link to="/profile" className="nav-link">Профиль</Link>
        <Link to="/lines" className="nav-link">Линии</Link>
        <Link to="/calls" className="nav-link">Звонки</Link>
        <Link to="/bills" className="nav-link">Счета</Link>
    </Nav>
    {/* <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form> */}
    <Nav>
    <Nav.Link>{localStorage.getItem('email')}</Nav.Link>
      <Button variant="outline-info" onClick={logout}>Выход</Button>
    </Nav>
  </Navbar>
        </div>
    );
}

export default withRouter(NavComponent);