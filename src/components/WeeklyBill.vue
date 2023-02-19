<template>
    <div class="col s12 m6 l4">
        <div class="card bill-card" id="weekly-card">
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

<style>
.card#weekly-card {
  background: rgb(127,137,255);
  background: linear-gradient(141deg, rgba(127,137,255,1) 0%, rgba(13,216,255,1) 100%);
  
}

</style>