<template>
    <ul class="sidenav app-sidenav" :class="{open: value}" id="myside">
        <router-link
            v-for="link in getLinksByUserRole"
            :key="link.url"
            tag="li"
            active-class="active"
            :to="link.url"
            :exact="link.exact"
        >
            <a href="#" class="sideel white-text waves-effect waves-purple pointer">{{link.title}}</a>
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
            {title: 'Новый заказ', url: '/order'},
            {title: 'Мои заказы', url: '/history'},
            {title: 'Моя статистика', url: '/statistic'}
        ],
        moderatorLinks: [
            {title: 'Главная', url: '/', exact: true},
            {title: 'Новый заказ', url: '/order'},
            {title: 'Все заказы', url: '/history'},
            {title: 'Готовы к отгрузке', url: '/not-shipped'},
        ],
        adminLinks: [
            {title: 'Главная', url: '/', exact: true},
            {title: 'Новый заказ', url: '/order'},
            {title: 'Мои заказы', url: '/history'},
            {title: 'Все заказы', url: '/all-orders'},
            {title: 'Готовы к отгрузке', url: '/not-shipped'},
            {title: 'Моя статистика', url: '/statistic'},
            {title: 'Общая статистика', url: '/general-statistic'},
            {title: 'Инфографика', url: '/infografic'}
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

<style>
.sidenav#myside {
    background: rgb(49,48,78);
    background: linear-gradient(180deg, rgba(49,48,78,1) 18%, rgba(86,71,142,1) 100%);
}
</style>
