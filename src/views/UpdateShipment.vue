<template>
    <div>
      <div class="page-title">
        <h3>Обновить информацию по доставке</h3>
      </div>
  
      <form class="form" @submit="updateOrder">
        <div class="input-field">
          <input
              id="shipmentDate"
              type="Date"
              v-model="shipmentDate"
          >
          <label for="shipmentDate">Дата доставки</label>
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
  name: "UpdateShipmentForm",
  data() {
    return {
        shipmentDate: null
    }
  },
  methods: {
      updateOrder() {
      const request = {
        id: this.$route.params.id,
        shipmentDate: this.shipmentDate,
        isShipped: true,
        stage: 'DONE'
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