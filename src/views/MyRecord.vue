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
                    v-for="(c, index) in categories"
                    :value="c.value"
                    :key="index">
                    {{ c.label }}
                </option>
                <label for="category">Категория:</label>
                </select>
        </div>
        <div class="input-field">
              <select id="productName" ref="select" v-model="productName" required>
                <option value="" selected disabled>Выберите Название продукта</option>
                  <option
                    v-for="(productName, index) in products"
                    :value="productName.value"
                    :key="index">
                    {{ productName.label }}
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
          <label for="price">Сумма</label>
        </div>
        <div class="input-field">
          <input
              id="weight"
              type="number"
              step=0.01
              v-model="weight"
          >
          <label for="weight">Вес</label>
        </div>
        <div class="input-field">
          <input
              id="plannedDateOfShipment"
              type="Date"
              v-model="plannedDateOfShipment"
          >
          <label for="plannedDateOfShipment">Дата доставки</label>
        </div>
        <div class="input-field">
          <input
              id="wishes"
              type="text"
              v-model="wishes"
          >
          <label for="wishes">Пожелания</label>
        </div>
  
        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </template>
  
<script>

/*global M*/
export default {
  name: "AddingForm",
  data() {
    return {
      select: null,
      productName:'Целлобактерин®+',
      category: 'Кормовые добавки',
      price: '',
      weight:'',
      plannedDateOfShipment:'',
      wishes:'',
      products: [
        { label: 'Целлобактерин®+',
          value: 'Cillobakterin+'
        },
        { label: 'Заслон®',
          value: 'Zaslon'
        },
        { label: 'Биотроф®',
          value: 'Biotrof'
        },
        { label: 'Агротроф®',
          value: 'Agrotrof'
        },
        { label: 'Интесан®',
          value: 'Intesan'
        }
        ],
        categories: [
        { label: 'Кормовые добавки',
          value: 'FeedAdditives'
        },
        { label: 'Сорбенты от микотоксикозов',
          value: 'SorbentsForMycotoxicosis'
        },
        { label: 'Биопрепараты и силосные закваски для заготовки кормов',
          value: 'BiologicsAndSilageFerments'
        },
        { label: 'Биопрепараты для переработки навоза и биодезодорации',
          value: 'BiologicalProductsForManureProcessing'
        }
      ]    
    }
  }, methods: {
      createOrder() {
      const request = {
        productName: this.productName, 
        category: this.category,
        price: this.price,
        weight:this.weight,
        plannedDateOfShipment:this.plannedDateOfShipment,
        wishes:this.wishes
      }
      try {
          this.$store.dispatch('CREATE_ORDER', request)
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