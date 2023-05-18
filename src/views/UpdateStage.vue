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

import constants from '@/utils/constants'

/*global M*/
export default {
  name: "UpdateStageForm",
  data() {
    return {
      status: null,
      select: null,
      statuses: [
      { label: constants.statuses[0].label,
        value: constants.statuses[0].value
      },
      { label: constants.statuses[1].label,
        value: constants.statuses[1].value
      },
      { label: constants.statuses[2].label,
        value: constants.statuses[2].value
      },
      { label: constants.statuses[3].label,
        value: constants.statuses[3].value
      }
  ]   
    }
  },
  methods: {
      async updateOrder() {
      const request = {
        id: this.$route.params.id,
        stage: this.status
      }
      console.log(request)
      try {
          await this.$store.dispatch('updateOrder', request)
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