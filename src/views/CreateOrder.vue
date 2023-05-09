<template>
    <div>
      <div class="page-title">
        <h3>Создать заказ</h3>
      </div>
  
      <form class="form" @submit="createOrder">
        <div class="input-field">
                <select id="category" ref="select" v-model="category" required>
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
              <select id="productName" ref="select" v-model="productName" required>
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
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </template>
  
<script>
import constants from '@/utils/constants'

/*global M*/
export default {
  name: "AddingForm",
  data() {
    return {
      select: null,
      productName:constants.products[0],
      category: constants.categories[0],
      price: '',
      weight:'',
      plannedDateOfShipment:'',
      clientFio:'',
      phoneNumber:'',
      address:'',
      products: constants.products,
      categories: constants.categories   
    }
  }, methods: {
      createOrder() {
      const request = {
        productName: this.productName, 
        category: this.category,
        price: this.price,
        weight:this.weight,
        plannedDateOfShipment:this.plannedDateOfShipment,
        clientFio:this.clientFio,
        phoneNumber:this.phoneNumber,
        address:this.address,
      }
      console.log(request)
      try {
          this.$store.dispatch('createOrder', request)
          } catch(e) {
            console.log('error')
        }
    }
  }, mounted() {
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