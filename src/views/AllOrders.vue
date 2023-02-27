<template>
  <div>
  <div class="page-title">
    <h3>Список всех заказов</h3>
  </div>
  <MyLoader v-if="loading"/>

  <h3 class="center" v-else-if="!orders.length">Здесь пока ничего нет
  <router-link to="/order"> Создать заказ</router-link></h3>
    <div v-else>
    <section>
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
</div>
</template>

/* eslint-disable */
<script>

import { mapActions, mapGetters } from 'vuex';
import HistoryTable from '@/components/HistoryTable.vue';
import MyLoader from '@/components/app/MyLoader.vue';
import paginationMixin from '@/mixins/pagination.mixin';

export default {
name: 'all-orders',
mixins: [paginationMixin],
components: {
  HistoryTable,
  MyLoader
},
data: () => ({
  loading: true,
  orders: [],
  products: [
      { label: 'Целлобактерин®+',
        value: 'Cillobakterin+'
      },
      { label: 'Заслон®',
        value: 'Zaslon'
      },
      { label: 'Биотроф®',
        value: 'Biotrof'
      },
      { label: 'Агротроф®',
        value: 'Agrotrof'
      },
      { label: 'Интесан®',
        value: 'Intesan'
      }
      ],
  categories: [
      { label: 'Кормовые добавки',
        value: 'FeedAdditives'
      },
      { label: 'Сорбенты от микотоксикозов',
        value: 'SorbentsForMycotoxicosis'
      },
      { label: 'Биопрепараты и силосные закваски для заготовки кормов',
        value: 'BiologicsAndSilageFerments'
      },
      { label: 'Биопрепараты для переработки навоза и биодезодорации',
        value: 'BiologicalProductsForManureProcessing'
      }
    ],
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
    'getAllOrders'
    ])
}, computed: {
    ...mapGetters([
      'ORDERS'
    ])
},
async mounted () {
  try {
      await this.$store.dispatch('getAllOrders')
   } catch(e) {
      console.log('error')
   }
    const ordrs = this.ORDERS
    this.setupPagination(this.orders = ordrs.map(order => {
    // eslint-disable-next-line
    Object.entries(this.products).forEach(([key, value]) => {
    if(order.productName === value.value) {
      order.productName = value.label
    }
    });
    // eslint-disable-next-line
    Object.entries(this.categories).forEach(([key, value]) => {
    if(order.category === value.value) {
      order.category = value.label
    }
  })
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
}
</script>