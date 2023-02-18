<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
            <span class="card-title">Войти</span>
        <div class="input-field">
            <input
            id="login"
            type="text"
            class="validate"
            >
            <label for="login">Login</label>
            
        </div>
        <div class="input-field">
            <input
            id="password"
            type="password"
            class="validate"
            >
            <label for="password">Пароль</label>
            
        </div>
    </div>
    <div class="card-action">
        <div>
            <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
            >
            Войти
            <i class="material-icons right">send</i>
            </button>
        </div>
             <p class="center">
            Нет аккаунта?
            <router-link to="/register">Зарегистрироваться</router-link>
            </p>
        </div>
    </form>
</template>

<script>


export default {
    name:'v-login',
    data: () => ({
        email: '',
      password: ''
    }),
    methods: {
        submitHandler() {
            this.$router.push('/')
        }
    }

}
</script>