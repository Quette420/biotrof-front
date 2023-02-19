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
                <th>Отгружено</th>
              </tr>
              </thead>

              <tbody>
              <tr>
                <td>За год</td>
                <td>{{yearlySum}} ₽</td>
                <td>{{yearlyInProcess}} ₽</td>
                <td>{{yearlyClosed}} ₽</td>
              </tr>
              <tr>
                <td>За месяц</td>
                <td>{{monthlySum}} ₽</td>
                <td>{{monthlyInProcess}} ₽</td>
                <td>{{monthlyClosed}} ₽</td>
              </tr>
              <tr>
                <td>За неделю</td>
                <td>{{weeklySum}} ₽</td>
                <td>{{weeklyInProcess}} ₽</td>
                <td>{{weeklyClosed}} ₽</td>
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
    weeklySum: {
      type: Number,
      default() {
        0
    }},
    weeklyInProcess: {
      type: Number,
      default() {
        0
      }
    },
    weeklyClosed: {
      type: Number,
      default() {
       0
      }
    },
    monthlySum: {
      type: Number,
      default() {
        0
    }},
    monthlyInProcess: {
      type: Number,
      default() {
        0
      }
    },
    monthlyClosed: {
      type: Number,
      default() {
       0
      }
    },
    yearlySum: {
      type: Number,
      default() {
        0
    }},
    yearlyInProcess: {
      type: Number,
      default() {
        0
      }
    },
    yearlyClosed: {
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