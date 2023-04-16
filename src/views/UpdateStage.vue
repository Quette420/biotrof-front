<template>
    <div>
      <div class="page-title">
        <h3>Обновить текущий статус заказа</h3>
      </div>
  
      <form class="form" @submit="updateOrder">
        <div class="input-field">
                <select id="category" ref="select" v-model="status" required>
                  <option value="" selected disabled>Выберите статус</option>
                    <option
                    v-for="(status, index) in statuses"
                    :value="status.value"
                    :key="index"
                  >
                    {{ status.label }}
                </option>
                <label for="category">Статус:</label>
                </select>
        </div>
        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </template>
  
<script>


/*global M*/
export default {
  name: "UpdateStageForm",
  data() {
    return {
      status: null,
      select: null,
      statuses: [
      { label: 'Не оплачено',
        value: 'WAITING_FOR_PAYMENT'
      },
      { label: 'Подписание',
        value: 'CONTRACT_SIGNING'
      },
      { label: 'Изготовление',
        value: 'MANUFACTURE'
      },
      { label: 'Готово к отгрузке',
        value: 'READY_FOR_SHIPMENT'
      }
  ]   
    }
  },
  methods: {
      updateOrder() {
      const request = {
        id: this.$route.params.id,
        stage: this.status
      }
      console.log(request)
      try {
          this.$store.dispatch('updateOrder', request)
          } catch(e) {
            console.log('error')
        }
    },
  }, async mounted() {
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