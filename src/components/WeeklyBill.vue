<template>
    <div class="col s12 m6 l4">
        <div class="card light-blue bill-card">
          <div class="card-content white-text">
            <span class="card-title">Статистика за неделю</span>

            <p class="currency-line">
              <span>Заказов зарегистрировано: {{sum}}</span>
            </p>
            <p class="currency-line">
              <span>В работе: {{inProcess}}</span>
            </p>
            <p class="currency-line">
              <span>Закрыто: {{closed}}</span>
            </p>
          </div>
        </div>
    </div>
</template>

<script>

export default {
  name: "weekly-bill",
  props: {
    sum: {
      type: Number,
      default() {
        0
    }},
    inProcess: {
      type: Number,
      default() {
        0
      }
    },
    closed: {
      type: Number,
      default() {
       0
      }
    }
  }

}

</script>