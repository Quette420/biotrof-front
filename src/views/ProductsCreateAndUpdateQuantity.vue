<template>
    <div>
      <div class="page-title">
        <h3>Добавление новых продуктов и обновление информации по наличию</h3>
      </div>
      <section>
        <div class="row">
          <div class="col s12 m6">
            <div>
              <div class="page-subtitle">
                <h4>Добавить новый продукт</h4>
              </div>
  
              <form class="form" @submit="createProduct">
        <div class="input-field">
                <select id="category" ref="select" v-model="newProductCategory" required>
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
          <input
              id="newProductName"
              type="text"
              v-model="newProductName"
          >
          <label for="newProductName">Название продукта</label>
          <span ></span>
        </div>

        <div class="input-field">
          <input
              id="newProductPrice"
              type="number"
              step=0.01
              v-model="newProductPrice"
          >
          <label for="newProductPrice">Цена за килограмм</label>
          <span ></span>
        </div>

        <button  class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
            </div>
          </div>
          <div class="col s12 m6">
            <div>
              <div class="page-subtitle">
                <h4>Обновить информацию о наличии</h4>
              </div>
  
              <form class="form" @submit="updateQuantity">
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
              id="quantity"
              type="number"
              step=0.01
              v-model="quantity"
          >
          <label for="quantity">Количество</label>
        </div>
        
        <button class="btn waves-effect waves-light" type="submit">
          Добавить
          <i class="material-icons right">add</i>
        </button>
      </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>


<script>
import constants from '@/utils/constants'
import CreateProductRequest from '../model/CreateProductRequest'
//v-show="newProductName && newProductCategory && newProductPrice"
/*global M*/
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      newProductCategory: constants.categories[0],
      newProductName: '',
      newProductPrice: '',
      select: null,
      productName:'',
      quantity:'',
      products: [''],
      categories: constants.categories
    }
  }, methods: {
      createProduct() {
        const request = new CreateProductRequest(this.newProductCategory, this.newProductName, this.newProductPrice);
        try {
          this.$store.dispatch('createProduct', request)
          } catch(e) {
            console.log('error')
        }
      },
      updateQuantity() {
      const request = {
        productName: this.productName, 
        quantity:this.quantity,
      }
      try {
          this.$store.dispatch('updateProductQuantity', request)
          } catch(e) {
            console.log('error')
        }
    }
  }, computed: {
    ...mapGetters([
      'PRODUCTS'
    ])
}, async mounted() {
    try {
      await this.$store.dispatch('getAllProductsSync')
      .then(response => {
        let productNames = response.data.map(p => p.productName + (p.quantity === null ? " (Нет в наличии)" : " (В наличии " + p.quantity + ")"))
        this.products = productNames
      }
      );
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

<style>

</style>