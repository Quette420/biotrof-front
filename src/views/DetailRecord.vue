<template>
    <div>
      <MyLoader v-if="loading"/>
      <div v-else-if="order">
      <div class="breadcrumb-wrap">
        <a href="/history" class="breadcrumb">История</a>
        <a class="breadcrumb">
          Информация о заказе
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="{
            'red': order.stage === 'WAITING_FOR_PAYMENT',
            'orange': order.stage === 'CONTRACT_SIGNING',
            'lime': order.stage === 'MANUFACTURE',
            'green': order.stage === 'READY_FOR_SHIPMENT',
            'blue': order.stage === 'DONE'
          }">
            <div class="card-content white-text">
              <p>Номер заказа: {{ order.id}}</p>
              <p>Название продукта: {{ products[order.productName]}}</p>
              <p>Категория: {{ categories[order.category] }}</p>
              <p>Вес: {{ order.weight }} кг</p>
              <p>Цена: {{ order.price }} ₽</p>
              <p>Планируемая дата доставки: {{ order.plannedDateOfShipment }}</p>
              <p>Дата доставки: {{ order.shipmentDate }}</p>
              <p>Отгружено: {{ order.isShipped ? 'Да' : 'Нет' }}</p>
              <p>Пожелания: {{ order.wishes }}</p>
              <p>Дата создания: {{ order.createDate }}</p>
              <p>Дата изменения: {{ order.modifiedDate }}</p>
              <p>Идентификатор сотрудника: {{ order.employerUuid }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h3 class="center" v-else>Запись с id = {{ $route.params.id }} не найдена</h3>
  </div>
</template>

<script>

import { mapActions } from 'vuex';
import MyLoader from '@/components/app/MyLoader.vue';

export default {
  name: 'detail-record',
  data: () => ({
    order:null,
    loading: true,
    products: {
      'Cillobakterin+': 'Целлобактерин®+',
      'Zaslon': 'Заслон®',
      'Biotrof': 'Биотроф®',
      'Agrotrof': 'Агротроф®',
      'Intesan': 'Интесан®'
    },
    categories:{
      'FeedAdditives': 'Кормовые добавки',
      'SorbentsForMycotoxicosis': 'Сорбенты от микотоксикозов',
      'BiologicsAndSilageFerments': 'Биопрепараты и силосные закваски для заготовки кормов',
      'BiologicalProductsForManureProcessing': 'Биопрепараты для переработки навоза и биодезодорации'
    },
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
  components: {
    MyLoader
  },
  methods:{ 
  ...mapActions([
      'getOrderByOrderId'
      ])
  },
  mounted() {
    const id = this.$route.params.id
    this.order = this.getOrderByOrderId(id).then(
    (response) => { 
      this.order = response.data
      console.log(this.order)
  },
    (error) => {
      console.log(error);
  }
  );
  this.loading = false;
 }
  
}

</script>