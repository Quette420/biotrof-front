<template>
    <form class="card auth-card" @submit.prevent="submitHandlerAsync"> 
      <div class="card-content">
        <span class="card-title">Регистрация</span>
        <div class="input-field">
          <input
          v-model="username"
              id="username"
              type="text"
              class="validate"
          >
          <label for="username">Имя пользователя</label>
        </div>
        <div class="input-field">
          <input
          v-model="email"
              id="email"
              type="email"
              class="validate"
          >
          <label for="email">Адрес электронной почты</label>
        </div>
        <div class="input-field">
          <input
          v-model="password"
              id="password"
              type="password"
              class="validate"
          >
          <label for="password">Пароль</label>
        </div>
        <div>
          <button
              class="btn waves-effect waves-light auth-submit"
              type="submit"
          >
            Зарегистрироваться
            <i class="material-icons right">send</i>
          </button>
          <p class="center">
          Уже есть аккаунт?
          <router-link to="/login">Войти!</router-link>
        </p>
        </div>
      </div>
      <!--<div class="card-action">
        <div>
          <button
              class="btn waves-effect waves-light auth-submit"
              type="submit"
          >
            Зарегистрироваться
            <i class="material-icons right">send</i>
          </button>
        </div>
  
        <p class="center">
          Уже есть аккаунт?
          <router-link to="/login">Войти!</router-link>
        </p>
      </div> -->
    </form>
  </template>
  
<script>
export default {
  name:'v-login',
    data: () => ({
        username: '',
        password: '',
        email: ''
    }),
    methods: {
        async submitHandlerAsync() {
            const request = {
                username: this.username, 
                password: this.password,
                email: this.email
            }
            try {
                await this.$store.dispatch('register', request)
            } catch(e) {
                console.log('error')
            }
        }
    }
}
</script>
  