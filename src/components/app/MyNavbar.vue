<template>
    <nav class="navbar " id="mynav">
        <div class="nav-wrapper">
            <div class="navbar-left">
            <a href="#" @click.prevent="$emit('click')">
            <i class="material-icons white-text">dehaze</i>
            </a>
            <span class="white-text">{{date | date('datetime')}}</span>
        </div>
        <ul class="right hide-on-small-and-down">
          <li>
            <a
                class="dropdown-trigger white-text"
                href="#"
                data-target="dropdown"
                ref="dropdown"
            >{{USERNAME }}
              <i class="material-icons right">arrow_drop_down</i>
            </a>

            <ul id='dropdown' class='dropdown-content'>
              <li>
                <router-link to="/profile" class="black-text">
                  <i class="material-icons">account_circle</i>Профиль
                </router-link>
              </li>
              <li class="divider" tabindex="-1"></li>
              <li>
                <a href="#" class="black-text" @click.prevent="logout">
                  <i class="material-icons">assignment_return</i>Выйти
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
</template>

<script>

import { mapGetters } from 'vuex'

/*global M*/
export default {
    data: () => ({
        date: new Date(),
        interval: null,
        dropdown: null
    }),
    mounted() {
        this.interval = setInterval(() => {
            this.date = new Date()
        }, 1000)
        this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
            constrainWidth: false
        })
    },
    beforeDestroy() {
        clearInterval(this.interval)
        if(this.dropdown && this.dropdown.destroy) {
            this.dropdown.destroy()
        }
    },
    methods: {
        logout() {
            console.log('logout')
            this.$store.dispatch('logout')
            this.$router.push('/login?message=logout')
        }
    }, computed: {
      ...mapGetters([
                'USERNAME'
            ])
    }
}

</script>

<style>
.navbar#mynav {
  background: rgb(49,48,78);
  background: linear-gradient(75deg, rgba(49,48,78,1) 0%, rgba(86,71,142,1) 100%);
}
</style>