<template>
    <ul class="sidenav app-sidenav" :class="{open: value}">
        <router-link
            v-for="link in getLinksByUserRole"
            :key="link.url"
            tag="li"
            active-class="active"
            :to="link.url"
            :exact="link.exact"
        >
            <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
        </router-link>
    </ul>
</template>

<script>

export default {
    props: ['value'],
    data: () => ({
        user: {

        },
        userLinks: [
            {title: 'Главная', url: '/', exact: true},
            {title: 'Мои заказы', url: '/history'},
            {title: 'Новый заказ', url: '/record'}
        ],
        moderatorLinks: [
            {title: 'Главная', url: '/', exact: true},
            {title: 'Все заказы', url: '/history'},
            {title: 'Готовы к отгрузке', url: '/not-shipped'},
            {title: 'Новый заказ', url: '/record'}
        ],
        adminLinks: [
            {title: 'Главная', url: '/', exact: true},
            {title: 'Мои заказы', url: '/history'},
            {title: 'Все заказы', url: '/all-orders'},
            {title: 'Готовы к отгрузке', url: '/not-shipped'},
            {title: 'Новай заказ', url: '/record'},
            {title: 'Статистика', url: '/planning'}
        ]
    }),
    computed: {
        currentUser() {
            return localStorage.getItem('uuid');
        },
        getLinksByUserRole() {
            if(this.$store.state.auth.user.role ==='ADMIN') {
                return this.adminLinks;
            } else if (this.$store.state.auth.user.role === 'WAREHOUSE_MANAGER') {
                return this.moderatorLinks
            } else {
                return this.userLinks
            }
        }
    }, mounted() {
        this.$store.dispatch('getUser').then(
        (response) => {
          this.user = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
    }
}

</script>
