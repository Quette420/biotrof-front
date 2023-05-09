<template>
<div>
  <div class="page-title">
    <h3>Сформировать отчет по заказам</h3>
  </div>
  <form class="form" @submit="filterByDateAndDownload">
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
              id="dateFrom"
              type="Date"
              v-model="dateFrom"
          >
          <label for="dateFrom">От</label>
        </div>
        <div class="input-field">
          <input
              id="dateTo"
              type="Date"
              v-model="dateTo"
          >
          <label for="dateTo">До</label>
        </div>
        <button class="btn waves-effect waves-light" type="submit">
          Скачать отчет
          <i class="material-icons right">download</i>
        </button>
  </form>
</div>
</template>


<script>
import constants from '@/utils/constants'

import { mapGetters } from 'vuex'

export default {
    name: 'ReportsDownload',
    data() {
    return {
      ordersByDate: null,
      productName: '',
      dateFrom: '',
      dateTo: '',
      csvHeaders : [
        'id',
        'Категория',
        'Стоимость',
        'Вес',
        'Название добавки',
        'Дата создания'
      ],
      products: constants.products,
      pdcts: constants.productsWithTranslate,
      categories: constants.categoriesWithTranslate  
    }
  },
    async mounted () {
      try {
      await this.$store.dispatch('getOrdersByDate')
    } catch(e) {
      console.log('error')
    }
    this.ordersByDate = this.ORDERS_BY_DATE
    this.setupOrderNames(this.ORDERS_BY_DATE)
    this.setupOrderCategories(this.ORDERS_BY_DATE)
}, methods: {
  filterByDateAndDownload() {
    this.dateFrom = new Date(this.dateFrom)
    this.dateTo = new Date(this.dateTo)
    const result = this.ORDERS_BY_DATE;
    const items = result.filter(this.dateFiler)
    this.formatDates(items)
    console.log(items)
    const replacer = (key, value) => value === null ? '' : value
    const hdr = Object.keys(items[0])
    const csv = [
    hdr.join(','),
      ...items.map(row => hdr.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n')
    this.download(csv);
  
  },
  download (input) {
    console.log(input)
    const blob = new Blob([input], {type: 'application/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = 'test-csv.csv';
    a.href = url;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  },
  setupOrderNames(ordrs) {
    this.ordersByDate = ordrs.map(order => {
      // eslint-disable-next-line
      Object.entries(this.pdcts).forEach(([key, value]) => {
      if(order.product_name === value.label) {
        order.product_name = value.value
      }
      });  
        return {
          ...order
         }
      })
  }, 
  setupOrderCategories(ordrs) {
    this.ordersByDate = ordrs.map(order => {
      // eslint-disable-next-line
      Object.entries(this.categories).forEach(([key, value]) => {
      if(order.category === value.label) {
        order.category = value.value
      }
      });  
        return {
          ...order
         }
  
      })
  },
  formatDates(ordrs) {
    this.ordersByDate = ordrs.map(order => {
      const date = new Date(order.create_date)
       order.create_date = date.toISOString().split('T')[0]
      })
  },
  dateFiler(ordr) {
    const date = new Date(ordr.create_date)
    return this.dateFrom <= date && date <= this.dateTo;
  }
}, computed: {
  ...mapGetters([
    'ROLE',
    'ORDERS',
    'ORDERS_BY_DATE'
])
}
}
</script>

<style>

</style>

