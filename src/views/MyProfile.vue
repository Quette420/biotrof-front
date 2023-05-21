<template>
    <div>
      <div class="page-title">
        <h3>Профиль</h3>
      </div>
      <h4>Ваше имя пользователя: {{ this.USER.username }}</h4>
      <h4>Ваша должность: {{ this.USER.role === 'USER' ? 'Пользователь' : this.$store.state.auth.user.role === 'WAREHOUSE_MANAGER' ? 'Модератор' : 'Администратор'}}</h4>
      <h4>Ваш id сотрудника: {{ this.USER.uuid }}</h4>
      <h4>Ваш email: {{ this.USER.email ?  this.USER.email : "вы не указывали адрес электронной почты."}}</h4>
      <button class="btn-small btn" 
            @click="$router.push('/change-password/')">
              <i class="material-icons">Сменить пароль</i>
      </button>
      <button v-show="!this.$store.state.auth.user.email" class="btn-small btn" 
            @click="$router.push('/create-email/')">
              <i class="material-icons">Добавить адрес электронной почты</i>
      </button>
     <!--<form class="form">
        <div class="input-field">
          <input
              id="description"
              type="text"
          >
          <label for="description">Имя</label>
          <span
                class="helper-text invalid">name</span>
        </div>
  
        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form> --> 
    </div>
  </template>

  <script>

import { mapGetters } from "vuex";

export default {
    name:'v-profile',
    computed: {
        ...mapGetters(['USER'])
    }
}

</script>