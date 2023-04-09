<template>
  <div>
  <div class="page-title">
    <h3>Список заказов готовых к отгрузке</h3>
  </div>

  <div class="history-chart">
    
  </div>
  <MyLoader v-if="loading"/>

  <h3 class="center" v-else-if="!orders.length">Здесь пока ничего нет
  <router-link to="/order"> Создать заказ</router-link></h3>

  <section v-else>
    <HistoryTable :orders="items"/>
    <historyPaginate
      :page-count="pageCount"
      :click-handler="pageChangeHandler"
      :prev-text="'Назад'"
      :next-text="'Вперед'"
      :container-class="'pagination'"
      :page-class="'waves-effect'"
      />
  </section>
</div>
</template>

/* eslint-disable */
<script>

import { mapActions } from 'vuex';
import HistoryTable from '@/components/HistoryTable.vue';
import MyLoader from '@/components/app/MyLoader.vue';
import paginationMixin from '@/mixins/pagination.mixin';

export default {
name: 'not-shipped',
mixins: [paginationMixin],
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
        color: 'yellow'
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
    'getNotShippedOrders'
    ])
},
mounted () {
  this.getNotShippedOrders().then(
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

},
components: {
  HistoryTable,
  MyLoader
}

}
</script>