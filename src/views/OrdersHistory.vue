<template>
    <div>
    <div class="page-title">
      <h3>Список моих заказов</h3>
    </div>

    
    <MyLoader v-if="loading"/>

    <h3 class="center" v-else-if="!orders.length && loading=== false">Здесь пока ничего нет
    <router-link to="/order"> Создать заказ</router-link></h3>
      <div v-else>
        
        <section >
      <HistoryTable :orders="items"/>
      <historyPaginate
      v-model="page"
      :page-count="pageCount"
      :click-handler="pageChangeHandler"
      :prev-text="'Назад'"
      :next-text="'Вперед'"
      :container-class="'pagination'"
      :page-class="'waves-effect'"
      />
    </section>
      </div>
    
  </div>
</template>

/* eslint-disable */
<script>

import { mapActions } from 'vuex';
import HistoryTable from '@/components/HistoryTable.vue';
import MyLoader from '@/components/app/MyLoader.vue';
import paginationMixin from '@/mixins/pagination.mixin';

export default {
  name: 'orders-history',
  mixins: [paginationMixin],
  components: {
    HistoryTable,
    MyLoader
  },
  data: () => ({
    loading: true,
    orders: [],
    statuses: [
        { label: 'Не оплачено',
          value: 'WAITING_FOR_PAYMENT',
          color: 'red'
        },
        { label: 'Подписание',
          value: 'CONTRACT_SIGNING',
          color:  'orange'
        },
        { label: 'Изготовление',
          value: 'MANUFACTURE',
          color: '#c0ca33 lime darken-1'
        },
        { label: 'Готово к отгрузке',
          value: 'READY_FOR_SHIPMENT',
          color: 'green'
        },
        { label: 'Отгружено',
          value: 'DONE',
          color: 'blue'
        }
    ]
  }),
  methods:{ 
  ...mapActions([
      'getAllOrdersByUuid'
      ])
},
  mounted () {
    this.getAllOrdersByUuid().then(
    (response) => {
    if(response.data) {
      console.log('Orders arrived!')
      const ordrs = response.data
      this.setupPagination(this.orders = ordrs.map(order => {
      // eslint-disable-next-line
      Object.entries(this.statuses).forEach(([key, value]) => {
      if(order.stage === value.value) {
        order.stage = value.label
        order.typeClass = value.color
      }
      });  
        return {
          ...order
         }

      }))
      this.loading = false;
    }
  },
    (error) => {
      console.log(error);
  }
);
  
}

}
</script>