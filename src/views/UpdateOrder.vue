<template>
    <div>
      <div class="page-title">
        <h3>Обновить информацию по заказу</h3>
      </div>
  
      <form class="form" @submit="updateOrder">
        <div class="input-field">
                <select id="category" ref="select" v-model="category">
                  <option value="" selected disabled>Выберите категорию</option>
                    <option
                    v-for="category in categories"
                    :key="category"
                  >
                    {{ category }}
                </option>
                <label for="category">Категория:</label>
                </select>
        </div>
        <div class="input-field">
              <select id="productName" ref="select" v-model="productName">
                <option value="" selected disabled>Выберите Название продукта</option>
                  <option
                    v-for="productName in products"
                    :key="productName"
                    >
                    {{ productName }}
                </option>
                <label for="productName">Название продукта:</label>
                </select>
            </div>
        <div class="input-field">
          <input
              id="price"
              type="number"
              v-model="price"
              value="price"
          >
          <label for="price">Стоимость товара</label>
        </div>
        <div class="input-field">
          <input
              id="weight"
              type="number"
              step=0.01
              v-model="weight"
          >
          <label for="weight">Вес товара</label>
        </div>
        <div class="input-field">
          <input
              id="clientFio"
              type="text"
              v-model="clientFio"
          >
          <label for="clientFio">ФИО клиента</label>
        </div>
        <div class="input-field">
          <input
              id="phoneNumber"
              type="tel"
              v-model="phoneNumber"
          >
          <label for="phoneNumber">Телефон для связи</label>
        </div>
        <div class="input-field">
          <input
              id="address"
              type="text"
              v-model="address"
          >
          <label for="address">Адрес доставки</label>
        </div>
        <div class="input-field">
          <input
              id="plannedDateOfShipment"
              type="Date"
              v-model="plannedDateOfShipment"
          >
          <label for="plannedDateOfShipment">Дата доставки</label>
        </div>
        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </template>
  
<script>

import { mapActions } from 'vuex';

/*global M*/
export default {
  name: "UpdateForm",
  data() {
    return {
      order: null,
      select: null,
      productName:null,
      category: null,
      price: null,
      weight:null,
      plannedDateOfShipment:null,
      clientFio:null,
      phoneNumber:null,
      address:null,
      products: [
        'Целлобактерин®+',
        'Целлобактерин®-Т:',
        'Интебио®Форте',
        'Интебио®',
        'Провитол®',
        'Ликвипро®',
        'Профорт®',
        'Заслон®-Фито',
        'Заслон®',
        'Заслон®2+',
        'Биотроф®',
        'Биотроф®2',
        'Биотроф®-111',
        'Промилк®',
        'Промилк ®+',
        'Биотроф®-600',
        'Агротроф®',
        'Интесан®', 
        ],
        categories: [
        'Кормовые добавки',
        'Сорбенты от микотоксикозов',
        'Биопрепараты и силосные закваски для заготовки кормов',
        'Биопрепараты для переработки навоза и биодезодорации',
      ]    
    }
  },
  methods: {
    ...mapActions([
      'getOrderByOrderId'
      ]),
      updateOrder() {
        this.checkNullOrUndefField(this.productName)
      const request = {
        id: this.$route.params.id,
        productName: this.checkNullOrUndefField(this.productName) ? this.productName : null, 
        category: this.checkNullOrUndefField(this.category) ? this.category : null,
        price: this.checkNullOrUndefField(this.price) ? this.price : null,
        weight: this.checkNullOrUndefField(this.weight) ? this.weight : null,
        plannedDateOfShipment: this.checkNullOrUndefField(this.plannedDateOfShipment) ? this.plannedDateOfShipment : null,
        clientFio: this.checkNullOrUndefField(this.clientFio) ? this.clientFio : null,
        phoneNumber: this.checkNullOrUndefField(this.phoneNumber) ? this.phoneNumber : null,
        address: this.checkNullOrUndefField(this.address) ? this.address : null,
      }
      console.log(request)
      try {
          this.$store.dispatch('updateOrder', request)
          } catch(e) {
            console.log('error')
        }
    },
    checkNullOrUndefField(field) {
        return typeof(field) !== "undefined" && field !== null ;
    }
  }, async mounted() {
    try {
      const response = await this.getOrderByOrderId(this.$route.params.id);
      this.order = response.data;
    } catch(e) {
      console.log('error')
   }
  console.log(this.order)
  this.productName = this.order.productName
    var elems = document.querySelectorAll('select')
    this.select = M.FormSelect.init(elems, this.$options)
  }, destroyed() {
    if(this.select && this.select.destroy) {
      this.select.destroy()
      console.log('destroyed')
    }
  }
}
</script>