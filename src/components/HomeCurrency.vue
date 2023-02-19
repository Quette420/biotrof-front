<template>
    <div class="col s14 m6 l12">
        <div class="card bill-card" id="mycard">
          <div class="card-content white-text">
            <div class="card-header">
              <span class="card-title"><h5>Выручка</h5></span>
            </div>
            <table>
              <thead>
              <tr>
                <th></th>
                <th>Всего</th>
                <th>В работе</th>
                <th>Закрыты</th>
              </tr>
              </thead>

              <tbody>
              <tr>
                <td>За год</td>
                <td>500000 ₽</td>
                <td>290000 ₽</td>
                <td>210000 ₽</td>
              </tr>
              <tr>
                <td>За месяц</td>
                <td>150000 ₽</td>
                <td>110000 ₽</td>
                <td>40000 ₽</td>
              </tr>
              <tr>
                <td>За неделю</td>
                <td>50000 ₽</td>
                <td>19000 ₽</td>
                <td>11000 ₽</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "home-currency",
  props: {
    weekly: {
      type: Number,
      default() {
        0
    }},
    monthly: {
      type: Number,
      default() {
        0
      }
    },
    yearly: {
      type: Number,
      default() {
       0
      }
    }
  }

}

</script>

<style>
.card#mycard {
  height:350px;
  font-size: 1.4em;
  background: rgb(54,168,195);
  background: linear-gradient(141deg, rgba(54,168,195,1) 0%, rgba(93,221,180,1) 100%);
  
}
</style>