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
        <div v-show="productName" class="input-field">
          <input
              id="weight"
              type="number"
              step=0.01
              v-model="weight"
          >
          <label for="weight">Вес товара в килограммах</label>
          <span v-show="!weight">Выберите количество товара</span>
        </div>
        <div v-show="weight && weightValidate >= weight" class="input-field">
          <input
              id="clientFio"
              type="text"
              v-model="clientFio"
          >
          <label for="clientFio">ФИО клиента</label>
          <span v-show="!clientFio">Введите фамилию имя и отчество клиента</span>
        </div>
        <div v-show="clientFio" class="input-field">
          <input
              id="phoneNumber"
              type="tel"
              v-model="phoneNumber"
          >
          <label for="phoneNumber">Телефон для связи</label>
          <span v-show="!phoneNumber">Укажите телефон клиента</span>
        </div>
        <div v-show="phoneNumber" class="input-field">
          <input
              id="address"
              type="text"
              v-model="address"
          >
          <label for="address">Адрес доставки</label>
          <span v-show="!address">Укажите адрес доставки</span>
        </div>
        <div v-show="address" class="input-field">
          <input
              id="plannedDateOfShipment"
              type="Date"
              v-model="plannedDateOfShipment"
          >
          <label for="plannedDateOfShipment">Дата доставки</label>
          <span v-show="!plannedDateOfShipment">Укажите желаемую дату доставки</span>
        </div>
        <button v-show="productName && category && weight && clientFio && phoneNumber && address && plannedDateOfShipment" class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
      <h4 v-if="weight"> {{weightValidate >= weight ? "Итоговая стоимость: " +  getPriceByName * weight + " рублей." : "Указанного количества товара нет в наличии."}}</h4>
    </div>
  </template>
  
<script>
import constants from '@/utils/constants'
import { mapGetters } from 'vuex'

/*global M*/
export default {
  name: "AddingForm",
  data() {
    return {
      select: null,
      productName: null,
      category: null,
      price: '',
      weight:'',
      plannedDateOfShipment:'',
      clientFio:'',
      productNames: '',
      phoneNumber:'',
      address:'',
      products: constants.products,
      categories: constants.categories,
      feedAdditives: [],
      sorbentsForMycotoxicosis: [],
      biologicsAndSilageFermentsForForagePreparation: [],
      biologicalProductsForManureProcessingAndBiodesodorization: []
    }
  }, methods: {
      createOrder() {
      const request = {
        productName: this.productName.substr(0, this.productName.indexOf('(') - 1), 
        category: this.category,
        price: this.weight * this.getPriceByName,
        weight:this.weight,
        plannedDateOfShipment:this.plannedDateOfShipment,
        clientFio:this.clientFio,
        phoneNumber:this.phoneNumber,
        address:this.address,
      }
      console.log(request)
      if(this.productName != null) {
        try {
          this.$store.dispatch('createOrder', request)
          } catch(e) {
            console.log('error')
        }
      }
      
    }
  }, computed: {
    getPriceByName() {
      let price = 0;
      this.products.map(p => {
        if(p.productName === this.productName.substr(0, this.productName.indexOf('(') - 1)) {
          price = p.price
        }
      })
      return price;
    },
    filterProductsByCategory() {
      let productsByCategory = new Array();
      this.products.map(p => {
        if(p.category === this.category) {
          productsByCategory.push(p)
        }
      })
      return productsByCategory;
    },
    weightValidate() {
      let quantity = 0;
      this.products.map(p => {
        if(p.productName === this.productName.substr(0, this.productName.indexOf('(') - 1)) {
          quantity =  p.quantity;
        }
      })
      return quantity;
    },
    ...mapGetters([
      'PRODUCTS'
    ])
  },
   async mounted() {
    try {
      await this.$store.dispatch('getAllProductsSync')
      .then(response => {
        let productNames = response.data.map(p => p.productName + (p.quantity === null ? " (Нет в наличии)" : " (В наличии " + p.quantity + " кг)"))
        this.productNames = productNames
        response.data.map(p => {
          if(p.category.categoryName === constants.categories[0]) {
            this.feedAdditives.push(p.productName + (p.quantity === null ? " (Нет в наличии)" : " (В наличии " + p.quantity + " кг)"))
          } else if(p.category.categoryName === constants.categories[1]) {
            this.sorbentsForMycotoxicosis.push(p.productName + (p.quantity === null ? " (Нет в наличии)" : " (В наличии " + p.quantity + " кг)"))
          } else if(p.category.categoryName === constants.categories[2]) {
            this.biologicsAndSilageFermentsForForagePreparation.push(p.productName + (p.quantity === null ? " (Нет в наличии)" : " (В наличии " + p.quantity + " кг)"))
          } else {
            this.biologicalProductsForManureProcessingAndBiodesodorization.push(p.productName + (p.quantity === null ? " (Нет в наличии)" : " (В наличии " + p.quantity + " кг)"))
          }
        })
      }
      );
      this.products = this.PRODUCTS
   } catch(e) {
      console.log('error')
   }

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