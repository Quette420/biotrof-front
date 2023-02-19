<template>
    <div class="col s12 m6 l4">
        <div class="card bill-card" id="monthly-card">
          <div class="card-content white-text">
            <span class="card-title">Статистика за месяц</span>

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
  name: "monthly-bill",
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
.card#monthly-card {
  background: rgb(54,168,195);
  background: linear-gradient(141deg, rgba(54,168,195,1) 0%, rgba(93,221,180,1) 100%);
  
}

</style>