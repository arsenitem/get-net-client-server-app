import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Tabs ,Tab, FormControl, Form, Button, Row, Col } from 'react-bootstrap';

function EditProfile(props) {
    let [name, setName] = useState("");
    let [lastName, setLastName] = useState("");
    let [prevPass, setPrevPass] = useState("");
    let [newPass, setNewPass] = useState("");

    useEffect(() => {
      
        setName(props.user.firstName);
        setLastName(props.user.lastName);
    },[])
   
    function saveChanges() {
        Axios.post(`http://localhost:55759/api/user/update?email=${props.user.email}&firstName=${name}&lastName=${lastName}`).then(response =>{
            props.setUser(response.data)
        })
        props.setEditProfileEnabled(false)
    }

    function saveSecChanges() {
        Axios.post(`http://localhost:55759/api/user/updatepass?email=${props.user.email}&password=${newPass}`).then(response =>{
            props.setUser(response.data)
        })
        props.setEditProfileEnabled(false)
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
        <FormControl type="date" value={props.user.birthDate} onChange={(e) =>{setLastName(e.target.value)}}/>
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