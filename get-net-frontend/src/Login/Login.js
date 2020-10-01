import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button, Modal, Row, Col, Alert } from 'react-bootstrap';
import { Link, Redirect, withRouter } from 'react-router-dom';

function Login(props) {
    function login(e) {
        axios.get(`http://localhost:55759/api/auth/login?email=${email}&password=${password}`).then(response => {
            props.setUser(response.data);
            props.setUserAuth(true);
            props.history.push("/profile");
        }).catch(err => console.log(err))
        e.preventDefault();
        
    }
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [showModal, setShow] = useState(false);
    const [regEmail, setRegEmail] = useState("");
    const [regPass, setRegPass] = useState("");
    function submitRegister(e) {
        e.preventDefault();
        axios.get(`http://localhost:55759/api/auth/register?email=${regEmail}&password=${regPass}`).then(response => {
            setShowAlert(true);  
        }).catch(err => console.log(err))
         
    }
    return (
        <>
        <div className="Login">
            <Form onSubmit = {login}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email </Form.Label>
                    <Form.Control type="email" placeholder="email" required="true" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" placeholder="Пароль" required="true" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>
                {/* <Link to="/profile"> */}
                    <Button variant="primary" type="submit">
                        Войти
                    </Button>
                {/* </Link> */}
                <Button variant="link" onClick={() => { setShow(true) }}>
                    Register
                </Button>
            </Form>
            <Modal
                size="lg"
                show={showModal}
                onHide={() => setShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Регистрация
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Alert show={showAlert} variant="success" className="alert">
        <Alert.Heading>Регистрация завершена</Alert.Heading>
        <p>
           Подтвердите регистрацию. Письмо подтверждения отправлено на {regEmail}
        </p>
        <p>      
            <Button variant="primary" onClick={()=>{setShow(false)}}>
                Вход
            </Button>
        </p>
    </Alert>
    <Form onSubmit={submitRegister}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="email" required="true" value={regEmail} onChange={(e) => {setRegEmail(e.target.value)}}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" placeholder="Пароль" required="true" value={regPass} onChange={(e)=>{setRegPass(e.target.value)}}/>
                    </Form.Group>                  
                    {/* <Link to="/profile"> */}
                    <Button variant="primary" type="submit">
                        Зарегестрироваться
                        </Button>
                    {/* </Link> */}
                    </Form>
                </Modal.Body>
            </Modal>

        </div>
        </>
    );
}

export default withRouter(Login);
