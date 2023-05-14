<template>
  <div>
    <div class="page-title">
      <h3>Выбор графика</h3>
    </div>

    <form class="form"  @submit.prevent="createGraphic">
      
      <div class="input-field">
            <select id="graphicType" ref="select" v-model="graphicType" required>
              <option value="" selected disabled>Выберите тип графика</option>
                <option
                  v-for="graphicType in graphicTypes"
                  :key="graphicType"
                  >
                  {{ graphicType }}
              </option>
              <label for="graphicType">Название продукта:</label>
              </select>
          </div>
          
      <div class="input-field" v-if="graphicType === graphicTypes[3]">
        <input
            id="year"
            type="number"
            v-model="year"
        >
        <label for="year">Год</label>
      </div>
     
      <button v-if="graphicType === graphicTypes[3]" class="btn waves-effect waves-light" type="submit">
        Построить
        <i class="material-icons right">insert_chart</i>
      </button>
    </form>
    <OrdersInfographics
    v-if="graphicType && graphicType === graphicTypes[0]"
    />
    <OrdersCategoryInfographic
    v-if="graphicType && graphicType === graphicTypes[1]"
    />
    <OrdersInfographicByYear
    v-bind:year="2023"
    v-if="graphicType && graphicType === graphicTypes[3]"
    />
  </div>
</template>

<script>
import constants from '@/utils/constants'
import OrdersInfographics from './OrdersInfographics.vue';
import OrdersCategoryInfographic from './OrdersCategoryInfographic.vue';
import OrdersInfographicByYear from './OrdersInfographicByYear.vue';


/*global M*/
export default {
    name: "AddingForm",
    components: {OrdersInfographics, OrdersCategoryInfographic, OrdersInfographicByYear},
    data() {
        return {
            select: null,
            graphicType: constants.graphicTypes[0],
            year: "",
            graphicTypes: constants.graphicTypes,
            allOrdersGraphicToggle: false,
            ordersCategoryGraphicToggle: false,
            ordersProductGraphicToggle: false,
            ordersByYearGraphicToggle: false
        };
    },
    methods: {
      createGraphic() {
          this.allOrdersGraphicToggle = true
            console.log("s");
            if(this.year) {
              console.log("YEAR "  + this.year)
            }
          //  this.$router.push({ path: '/category-infographic', params:{title: 'TIDSAFAS'}  })
        },
       async closeAllOrdersGraphicPopUp() {
        await this.selectM()
          this.allOrdersGraphicToggle = false;
          console.log(!this.allOrdersGraphicToggle && !this.ordersCategoryGraphicToggle && !this.ordersProductGraphicToggle && !this.ordersByYearGraphicToggle)
          await this.selectM()
        },
        async selectM() {
          var elems = document.querySelectorAll("select");
        this.select = M.FormSelect.init(elems, this.$options);
        }
    },
    async mounted() {
       await this.selectM()
    },
    destroyed() {
        if (this.select && this.select.destroy) {
            this.select.destroy();
            console.log("destroyed");
        }
    }
}
</script>