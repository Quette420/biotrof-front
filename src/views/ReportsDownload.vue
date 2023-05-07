<template>
<div>
  <div class="page-title">
    <h3>Сформировать отчет по заказам</h3>
  </div>
  <form class="form" @submit.prevent="selectOrdersToDownload">
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
          <label for="dateFrom">Начальная дата</label>
        </div>
        <div class="input-field">
          <input
              id="dateTo"
              type="Date"
              v-model="dateTo"
          >
          <label for="dateTo">Дата окончания</label>
        </div>
        <button class="btn waves-effect waves-light" type="submit">
          Сформировать отчет
          <i class="material-icons right">send</i>
        </button>
  </form>
</div>
</template>


<script>

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
    console.log(this.ordersByDate)
}, methods: {
  selectOrdersToDownload() {
    const items = this.ORDERS_BY_DATE;
    const replacer = (key, value) => value === null ? '' : value
    const hdr = Object.keys(items[0])
    const csv = [
    this.csvHeaders.join(','),
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

