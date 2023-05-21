<template>
    
           
    <form class="form" @submit.prevent="submitHandlerAsync">
        <router-link to="/profile">Назад</router-link>
        <div class="input-field">
          <input
          v-model="email"
              id="email"
              type="email"
              class="validate"
          >
          <label for="email">Адрес электронной почты</label>
        </div>
        <div>
            <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
            >
            Добавить адрес электронной почты
            <i class="material-icons right">send</i>
            </button>
            
        </div>
    
    </form>
</template>

<script>

import CreateEmailRequest from '@/model/CreateEmailRequest';
import LocalStorageService from '@/services/LocalStorageService';


export default {
    name:'v-create-email',
    data: () => ({
        email: ''
    }),
    methods: {
        async submitHandlerAsync() {
            const request = new CreateEmailRequest(LocalStorageService.getUuid(), this.email)
            console.log(request)
            try {
                await this.$store.dispatch('createEmail', request)
            } catch(e) {
                console.log('error')
            }
        }
    }
}
</script>