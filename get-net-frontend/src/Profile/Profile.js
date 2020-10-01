import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import EditProfile from './EditProfile';

function Profile(props) {
    let [user, setUser] = useState({});
    useEffect(() => {
        Axios.get(`http://localhost:80/api/userinfo?id=${localStorage.getItem('id')}}`,{headers:{ Authorization: `Bearer ${localStorage.getItem('token')}`}}).then(response => {
            setUser(response.data);
        })
    }, [])
    let [editProfileEnabled, setEditProfileEnabled] = useState(false);
  return (
    <div className="Profile">
        <div className="profile-img">          
        </div>
        <div className="profile-info">
        <Row>
            <h2>ООО новый малый бизнес</h2>
        </Row>
        <hr/>
        {editProfileEnabled? <EditProfile setEditProfileEnabled = {setEditProfileEnabled} user={props.user} setUser= {props.setUser}/>: <>
           
        <Row>
            Имя: {props.user.firstName}
        </Row>
        <Row>
            Фамилия: {props.user.lastName}
        </Row>
        <Row>
            Ваш баланс: {props.user.balance}
        </Row>
        <Row>
            Дата регистрации: {props.user.regDate}
        </Row>        
        <Row>
            Дополнительная информация
        </Row>
        <hr/>
        <Row>
            <Button onClick={() =>setEditProfileEnabled(true)}>Редактировать профиль</Button>
        </Row></>}
        
        </div>
    </div>
  );
}

export default Profile;