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
      <UpdateOrderPopUp
        v-if="isInfoPopUpVisible"
        @closePopUp="closePopUp"
        />
      <div class="row"
      v-else>
        <div class="col s12 m6">
          <div class="card" :class="{
            '#c62828 red darken-3': order.stage === 'WAITING_FOR_PAYMENT',
            'orange': order.stage === 'CONTRACT_SIGNING',
            '#afb42b lime darken-2': order.stage === 'MANUFACTURE',
            'green': order.stage === 'READY_FOR_SHIPMENT',
            'blue': order.stage === 'DONE'
          }">
            <div class="card-content white-text">
              <p>Номер заказа: {{ order.id}}</p>
              <p>Название продукта: {{ this.order.product.productName}}</p>
              <p>Категория: {{ this.order.product.category.categoryName }}</p>
              <p>Вес: {{ order.weight }} кг</p>
              <p>Цена: {{ order.price }} ₽</p>
              <p>ФИО клиента: {{ this.order.client.lastName }} {{ this.order.client.firstName }} {{ this.order.client.middleName }} </p>
              <p>Номер телефона: {{ this.order.client.phoneNumber }} </p>
              <p>Адрес: {{ this.order.client.address }} </p>
              <p>Планируемая дата доставки: {{ order.plannedDateOfShipment }}</p>
              <p>Дата доставки: {{ order.shipmentDate }}</p>
              <p>Отгружено: {{ order.isShipped ? 'Да' : 'Нет' }}</p>
              <p>Дата создания: {{ order.createDate }}</p>
              <p>Дата изменения: {{ order.modifiedDate }}</p>
              <p>Идентификатор сотрудника: {{ order.employerUuid }}</p>
              <button class="btn-small orange btn" 
            @click="editOrder">
              <i class="material-icons">edit</i>
            </button>
              <button class="btn-small red btn" 
            @click="deleteOrder">
              <i class="material-icons">delete</i>
            </button>
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
import UpdateOrderPopUp from '@/components/popup/UpdateOrderPopUp.vue';

export default {
  name: 'detail-record',
  data: () => ({
    isInfoPopUpVisible: false,
    order:null,
    client: null,
    loading: true,
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
    MyLoader,
    UpdateOrderPopUp
  },
  methods:{ 
  ...mapActions([
      'getOrderByOrderId'
      ]),
  async editOrder(){
    this.isInfoPopUpVisible = true;
    console.log( this.$route.params.id)
  },
  closePopUp() {
    this.isInfoPopUpVisible = false;
  },
  async deleteOrder(){
    console.log(  this.$route.params.id)
      try {
      await this.$store.dispatch('deleteOrder',  this.$route.params.id)
      this.$router.push('/history')
      } catch(e) {
      console.log('error')
      }
  }
},
  async mounted() {
    
    try {
      const response = await this.getOrderByOrderId(this.$route.params.id);
      this.order = response.data;
    } catch(e) {
      console.log('error')
   }
  console.log(this.order)
  this.loading = false;
 }
  
}

</script>