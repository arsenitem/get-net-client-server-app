<template>
  <div class="profile">
    <div class="profile-img"></div>
    <div class="profile-info">
      <div class="row">
        <h2>ООО новый малый бизнес</h2>
      </div>
      <hr />
      <div class="row">Имя: {{user.firstName}}</div>
      <div class="row">Фамилия: {{user.lastName}}</div>
      <div class="row">Дата рождения: {{user.birthDate}}</div>
      <div class="row">Ваш баланс: {{user.balance}}</div>
      <div class="row">Дата регистрации: {{user.regDate}}</div>
      <div class="row">Дополнительная информация</div>
      <hr />
      <div class="row">
        <button type="button" class="btn btn-primary">
          Редактировать профиль
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import api from './../api.js'
export default {
  mounted() {
    api.getUserinfo(localStorage.getItem('id')).then(response => {
      this.user = response.data;
    }).catch(error => {
      console.log(error)
    })
  },
  data() {
    return {
      user: {}
    }
  }
};
</script>

<style>
.profile-img {
  float: left;
    width: 200px;
    height: 200px;
    background-image: url(https://picsum.photos/200);
}
.profile-info {
  width: 70%;
  margin-left: 30px;
  float: left;
}   
.profile {
  margin-top: 30px;
}
</style>