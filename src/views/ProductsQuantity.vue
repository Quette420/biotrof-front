<template>
    <div>
      <div class="page-title">
        <h3>Обновить информацию о наличии</h3>
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
  </template>
  
<script>

import { mapGetters } from 'vuex'

/*global M*/
export default {
  name: "AddingForm",
  data() {
    return {
      select: null,
      productName:'',
      quantity:'',
      products: ['']
    }
  }, methods: {
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