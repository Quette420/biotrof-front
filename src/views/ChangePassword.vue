<template>
    
           
    <form class="form" @submit.prevent="submitHandlerAsync">
        <router-link to="/profile">Назад</router-link>
        <div class="input-field">
            <input
            v-model="oldPassword"
            id="oldPassword"
            type="password"
            >
            <label for="oldPassword">Старый пароль</label>
            
        </div>
        <div class="input-field">
            <input
            v-model="newPassword"
            id="newPassword"
            type="password"
            >
            <label for="newPassword">Новый пароль</label>
            
        </div>
        <div class="input-field">
            <input
            v-model="duplicateNewPassword"
            id="duplicateNewPassword"
            type="password"
            >
            <label for="duplicateNewPassword">Новый пароль ещё раз</label>
            
        </div>
        <div v-show="newPassword && duplicateNewPassword && (newPassword === duplicateNewPassword) && (oldPassword != newPassword)">
            <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
            >
            Сменить пароль
            <i class="material-icons right">send</i>
            </button>
            
        </div>
        <h4 v-if="!(newPassword === duplicateNewPassword)"> {{vaidatePasswords(oldPassword, newPassword, duplicateNewPassword)}}</h4>
    
    </form>
</template>

<script>

import ChangePasswordRequest from '@/model/ChangePasswordRequest';
import LocalStorageService from '@/services/LocalStorageService';


export default {
    name:'v-change-password',
    data: () => ({
        oldPassword: '',
        newPassword: '',
        duplicateNewPassword: '',
        errorText: ''
    }),
    methods: {
        async submitHandlerAsync() {
            const request = new ChangePasswordRequest(LocalStorageService.getUuid(), this.oldPassword, this.newPassword, this.duplicateNewPassword)
            try {
                await this.$store.dispatch('changePassword', request)
            } catch(e) {
                console.log('error')
            }
        },
        vaidatePasswords(oldPassword, newPassword, duplicateNewPassword) {
            if(oldPassword === newPassword) {
                return "Новый пароль должен отличаться от старого."
            }
            if(newPassword != duplicateNewPassword) {
                return "Новые пароли не совпадают."
            } 
        }
    }
}
</script>