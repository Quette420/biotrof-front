<template>
  <div style="display: flex; flex-direction: column; height: 770px;">
    <div class="page-title">
      <h3>Список всех заказов</h3>
    </div>
    <ag-grid-vue
    style="width: 100%; height: 100%"
    class="ag-theme-alpine"
    :columnDefs="columnDefs.columns"
    :rowData="rowData.rows"
    :defaultColDef="defaultColDef.def"
    :pagination="true"
    paginationPageSize="13"
  >
  </ag-grid-vue>
  </div>
</template>

<script>
//style="width: auto; height: 550px; max-width: 1600; min-width: 1550; mac 640 height, looks better on wind
import { mapGetters } from 'vuex'
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue";
import {reactive} from "vue";
import OpenInNewButton from '../components/OpenInNewButton.vue';
import StatusComp from '../components/StatusComp.vue';
import constants from '@/utils/constants';

/* eslint-disable */
export default {
    components: {
    AgGridVue,
    OpenInNewButton,
    StatusComp
  },
    setup(props) {
        const columnDefs = reactive ({
            columns: [
            { headerName: 'ID', field: "id", },
            { headerName: 'Продукт',field: "product.productName" },
            { headerName: 'Категория',field: "product.category.categoryName" },
            { headerName: 'Стоимость', field: "price" },
           /* { headerName: 'Фамилия клиента',field: "client.lastName"},
            { headerName: 'Имя клиента', field: "client.firstName"},
            { headerName: 'Отчество клиента',field: "client.middleName"},*/
            { headerName: 'Телефон клиента',field: "client.phoneNumber"}, 
            { headerName: 'Дата создания', field: "createDate"},
            { headerName: 'Статус', field: "stage", cellRenderer: "StatusComp"},
            { headerName: 'Открыть',  field: 'id', cellRenderer: 'OpenInNewButton'},
            ]
        });
        const defaultColDef = reactive({
            def: {sortable: true, filter: true, flex: 1}
        });
        const rowData = reactive({
            rows: []
        });
        const statuses = constants.statuses;

        return { columnDefs, rowData, defaultColDef, statuses}
    },
    async mounted () {
    try {
      await this.$store.dispatch('getAllOrders')
    } catch(e) {
      console.log('error')
   }
   const ordrs = this.ORDERS;
   ordrs.map(order => {
      // eslint-disable-next-line
      Object.entries(this.statuses).forEach(([key, value]) => {
      if(order.stage === value.value) {
        order.stage = value.label
      }
      });  
        return {
          ...order
         }

      })
    this.rowData.rows = ordrs
    },
    computed: {
        ...mapGetters(['ORDERS'])
    },
    methods: {
    btnClickedHandler() {
      this.params.clicked(this.params.value);
    }
  },
}
</script>