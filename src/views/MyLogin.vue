<template>
    <form class="card auth-card" @submit.prevent="submitHandlerAsync">
        <div class="card-content">
            <span class="card-title">Войти</span>
        <div class="input-field">
            <input
            v-model="username"
            id="login"
            type="text"
            class="validate"
            >
            <label for="login">Login</label>
            
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
        username: '',
        password: ''
    }),
    methods: {
        async submitHandlerAsync() {
            const request = {
                username: this.username, 
                password: this.password
            }
            try {
                await this.$store.dispatch('login', request)
            } catch(e) {
                console.log('error')
            }
        }
    }

}
</script>