<template>
    <div class="app-main-layout">

      <MyNavbar @click="isOpen = !isOpen"
      
      />
      <MySidebar v-model="isOpen" />


      <main class="app-content" :class="{full : !isOpen}">
        <div class="app-page">
            <router-view />
        </div>
      </main>

     <!--  <div class="fixed-action-btn">
          <router-link class="btn-floating waves-effect waves-light btn-large purple" to="/order">
            <i class="large material-icons">add</i>
          </router-link>
      </div>
      -->
    </div>
</template>

<script>

import MyNavbar from '@/components/app/MyNavbar.vue';
import MySidebar from '@/components/app/MySidebar.vue';

export default {
  name: 'main-layout',
  data: () => ({
    isOpen: true
  }),
  components: {
    MyNavbar,
    MySidebar
  }
}
</script>
