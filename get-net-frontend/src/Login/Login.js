import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button, Modal, Row, Col, Alert } from 'react-bootstrap';
import { Link, Redirect, withRouter } from 'react-router-dom';

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [showModal, setShow] = useState(false);
    const [regEmail, setRegEmail] = useState("");
    const [regPass, setRegPass] = useState("");

    function login(e) {
        axios.get(`http://35.228.122.244:80/api/login?email=${email}&password=${password}`).then(response => { 
            localStorage.setItem('id', response.data.id);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', response.data.email);
            props.setUserAuth(true);
            props.history.replace("/profile#");
        }).catch(err => console.log(err))
        e.preventDefault();      
    }

    function submitRegister(e) {
        e.preventDefault();
        axios.get(`http://35.228.122.244:80/api/register?email=${regEmail}&password=${regPass}`).then(() => {
            setShowAlert(true);
        }).catch(err => console.log(err));     
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
                    <Button variant="primary" type="submit">
                        Войти
                    </Button>
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
                        <Button variant="primary" type="submit">
                            Зарегестрироваться
                            </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
        </>
    );
}

export default withRouter(Login);
