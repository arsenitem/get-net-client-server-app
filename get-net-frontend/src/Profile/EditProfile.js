import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Tabs ,Tab, FormControl, Form, Button, Row, Col, Alert } from 'react-bootstrap';

function EditProfile(props) {
    let [name, setName] = useState("");
    let [lastName, setLastName] = useState("");
    let [bday, setBday] = useState("");
    let [prevPass, setPrevPass] = useState("");
    let [newPass, setNewPass] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    useEffect(() => {
        setName(props.user.firstName);
        setLastName(props.user.lastName);
        setBday(props.user.birthDate);
    },[])
   
    function saveChanges() {
        Axios.post(`http://localhost:80/api/changeuserinfo?id=${localStorage.getItem('id')}&firstName=${name}&lastName=${lastName}&birthDate=${bday}`,null,
        {headers:{ Authorization: `Bearer ${localStorage.getItem('token')}`}}).then(response =>{
            props.setUser(response.data)
        })
        props.setEditProfileEnabled(false)
    }

    function saveSecChanges() {
        Axios.post(`http://localhost:80/api/changeuserpassword?id=${localStorage.getItem('id')}&password=${newPass}&prev=${prevPass}`, null,
        {headers:{ Authorization: `Bearer ${localStorage.getItem('token')}`}}).then(response => {
            props.setEditProfileEnabled(false)
        }).catch(() =>{
            setShowAlert(true);
        })
    }
   
  return (
    <div className="EditProfile">
     <Tabs defaultActiveKey="profile-info" transition={false} id="noanim-tab-example" bg="dark">
  <Tab eventKey="profile-info" title="Основная информация">
    <Row className="mt-3">
        <Col md={4}>
        <label>
            Имя
        </label>
        </Col>
        <Col>
        <FormControl value={name} onChange={(e) =>{setName(e.target.value)}}/>
        </Col>  
    </Row>
    <Row className="mt-3">
        <Col md={4} >
        <label>
            Фамилия
        </label>
        </Col>
        <Col>
        <FormControl value={lastName} onChange={(e) =>{setLastName(e.target.value)}}/>
        </Col>  
    </Row>
    <Row className="mt-3">
        <Col md={4}>
        <label>
            Дата рождения
        </label>
        </Col>
        <Col>
        <FormControl type="date" value={bday} onChange={(e) =>{setBday(e.target.value)}}/>
        </Col>  
    </Row>
    <Row className="mt-3 mb-2">
        <Col className="align-self-end" md={4}>
        <Button onClick={saveChanges}>Сохранить</Button>
        <Button onClick={() => {props.setEditProfileEnabled(false)}} variant="secondary">Отмена</Button>
        </Col>
    </Row>
   
  </Tab>
  <Tab eventKey="profile" title="Безопасность">
      <Row>
      <Alert show={showAlert} variant="danger" dismissible onClose={() => setShowAlert(false)}>
        <Alert.Heading>Ошибка</Alert.Heading>
        <p>      
            Старый пароль введен неверно
        </p>
    </Alert>
      </Row>
  <Row className="mt-3">
        <Col md={4}>
        <label>
            Старый пароль
        </label>
        </Col>
        <Col>
        <FormControl type="password" value={prevPass} onChange={(e)=> {setPrevPass(e.target.value)}}/>
        </Col>  
    </Row>
    <Row className="mt-3">
        <Col md={4} >
        <label>
            Новый пароль
        </label>
        </Col>
        <Col>
        <FormControl type="password" value={newPass} onChange={(e)=> {setNewPass(e.target.value)}}/>
        </Col>  
    </Row>
    <Row className="mt-3 mb-2">
        <Col className="align-self-end" md={4}>
        <Button onClick={saveSecChanges}>Сохранить</Button>
        <Button onClick={() => {props.setEditProfileEnabled(false)}}variant="secondary">Отмена</Button>
        </Col>  
    </Row>
  </Tab>
  <Tab eventKey="contact" title="Дополнительная информация" disabled>
    
  </Tab>
</Tabs>
    </div>
  );
}

export default EditProfile;