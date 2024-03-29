import Vue from 'vue'
import App from './App.vue'
import Paginate from 'vuejs-paginate'
import './registerServiceWorker'
import router from './router/router'
import store from './store/store'
import dateFilter from './filters/date.filter'
import messagePlugin from './utils/message.plugin'
import MyLoader from './components/app/MyLoader.vue'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min.js'
import VueExcelXlsx from "vue-excel-xlsx";

Vue.config.productionTip = false

Vue.use(VueExcelXlsx)
Vue.use(messagePlugin)
Vue.filter('date', dateFilter)
Vue.component('MyLoader', MyLoader)
Vue.component('historyPaginate', Paginate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
