<template>
    <div class="col s12 m6 l4">
        <div class="card bill-card" id="year-card">
          <div class="card-content white-text">
            <span class="card-title">Статистика за год</span>

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
  name: "year-bill",
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
<style>
.card#year-card {
  background: rgb(144,144,249);
  background: linear-gradient(141deg, rgba(144,144,249,1) 0%, rgba(216,117,220,1) 100%);
}

</style>