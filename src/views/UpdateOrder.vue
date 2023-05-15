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
        <div v-show="category && categories[0] === category" class="input-field">
              <select id="productName" ref="select" v-model="productName">
                <option value="" selected disabled>Выберите Название продукта</option>
                  <option
                    v-for="productName in feedAdditives"
                    :key="productName"
                    >
                    {{ productName }}
                </option>
                <label for="productName">Название продукта:</label>
                </select>
            </div>
            <div v-show="category && categories[1] === category" class="input-field">
              <select id="productName" ref="select" v-model="productName">
                <option value="" selected disabled>Выберите Название продукта</option>
                  <option
                    v-for="productName in sorbentsForMycotoxicosis"
                    :key="productName"
                    >
                    {{ productName }}
                </option>
                <label for="productName">Название продукта:</label>
                </select>
            </div>
            <div v-show="category && categories[2] === category" class="input-field">
              <select id="productName" ref="select" v-model="productName">
                <option value="" selected disabled>Выберите Название продукта</option>
                  <option
                    v-for="productName in biologicsAndSilageFermentsForForagePreparation"
                    :key="productName"
                    >
                    {{ productName }}
                </option>
                <label for="productName">Название продукта:</label>
                </select>
            </div>
            <div v-show="category && categories[3] === category" class="input-field">
              <select id="productName" ref="select" v-model="productName">
                <option value="" selected disabled>Выберите Название продукта</option>
                  <option
                    v-for="productName in biologicalProductsForManureProcessingAndBiodesodorization"
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
import constants from '@/utils/constants';

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
      products: constants.products,
      categories: constants.categories,
      feedAdditives: [],
      sorbentsForMycotoxicosis: [],
      biologicsAndSilageFermentsForForagePreparation: [],
      biologicalProductsForManureProcessingAndBiodesodorization: []
    }
  },
  methods: {
    ...mapActions([
      'getOrderByOrderId'
      ]),
      async updateOrder() {
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
          await this.$store.dispatch('updateOrder', request)
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
      await this.$store.dispatch('getAllProductsSync')
      .then(response => {
        response.data.map(p => {
          if(p.category.categoryName === constants.categories[0]) {
            this.feedAdditives.push(p.productName)
          } else if(p.category.categoryName === constants.categories[1]) {
            this.sorbentsForMycotoxicosis.push(p.productName)
          } else if(p.category.categoryName === constants.categories[2]) {
            this.biologicsAndSilageFermentsForForagePreparation.push(p.productName)
          } else {
            this.biologicalProductsForManureProcessingAndBiodesodorization.push(p.productName)
          }
        })
      }
      );
      this.products = this.PRODUCTS
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