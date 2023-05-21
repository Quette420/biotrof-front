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
       
        <vue-excel-xlsx v-show="ordersToDownload" class="btn waves-effect waves-light" type="submit"
        :data="ordersToDownload"
        :columns="columns"
        :file-name="'Заказы'"
        :file-type="'xlsx'"
        :sheet-name="'sheetname'"
        >
        Скачать
        <i class="material-icons">file_download</i>
    </vue-excel-xlsx>
  </form>
  <button v-show="!ordersToDownload" class="btn waves-effect waves-light" @click="doFilterByDates">
    Сгенерировать отчет
    <i class="material-icons">hourglass_empty</i>
</button>
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
      dateFromToFilter: '',
      dateToToFilter:'',
      ordersToDownload: null,
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
      categories: constants.categoriesWithTranslate,
      columns : [
        {
          label: "ID",
          field: "id",
        },
        {
          label: "Категория",
          field: "category",
        },
        {
          label: "Продукт",
          field: "productName",
        },
        {
          label: "Цена",
          field: "price",
          dataFormat: this.priceFormat
        },
        {
          label: "Вес",
          field: "weight",
          dataFormat: this.weightFormat
        },
        {
          label: "Статус",
          field: "stage",
        },
        {
          label: "Имя клиента",
          field: "clientFirstName",
        },
        {
          label: "Фамилия клиента",
          field: "clientLastName",
        },
        {
          label: "Отчество клиента",
          field: "clientMiddleName",
        },
        {
          label: "Телефон клиента",
          field: "clientNumber",
        },
        {
          label: "Адрес клиента",
          field: "address",
        },
        {
          label: "Отгружено",
          field: "isShipped",
          dataFormat: this.booleanConvert
        },
        {
          label: "Дата создания",
          field: "createDate",
        },
        {
          label: "Дата доставки",
          field: "shipmentDate",
        },
        {
          label: "ID сотрудника",
          field: "employerUuid",
        }
      ]  
    }
  },
    async mounted () {
      try {
      await this.$store.dispatch('getOrdersByDate')
    } catch(e) {
      console.log('error')
    }
    this.ordersByDate = this.ORDERS_BY_DATE
    this.ordersByDate.map(order => {
    // eslint-disable-next-line
    Object.entries(constants.statuses).forEach(([key, value]) => {
    if(order.stage === value.value) {
      order.stage = value.label

    }
    });  
      return {
        ...order
       }
    })
    console.log(this.ordersByDate)
}, methods: {
  doFilterByDates() {
    this.dateFromToFilter = new Date(this.dateFrom);
    this.dateToToFilter = new Date(this.dateTo);
    const result = this.ORDERS_BY_DATE;
    const items = result.filter(this.dateFiler)
    this.formatDates(items)
    this.ordersToDownload = items 
  },
  priceFormat(value){
    return value + ' ₽';
  },
  weightFormat(value){
    return value + ' кг';
  },
  booleanConvert(value) {
    return value ? 'Да' : 'Нет';
  },
  filterByDateAndDownload() {
    console.log("Скачан отчет по заказам с " + this.dateFrom + " по " + this.dateTo)
  },
  formatDates(ordrs) {
    this.ordersByDate = ordrs.map(order => {
      const date = new Date(order.createDate)
       order.createDate = date.toLocaleDateString('en-GB')
       if(order.shipmentDate) {
        const shipmentDate = new Date(order.shipmentDate)
        order.shipmentDate = shipmentDate.toLocaleDateString('en-GB')
       }
      })
  },
  dateFiler(ordr) {
    const date = new Date(ordr.createDate)
    return this.dateFromToFilter <= date && date <= this.dateToToFilter;
  }
}, computed: {
  ...mapGetters(['ORDERS_BY_DATE'])
}
}
</script>

