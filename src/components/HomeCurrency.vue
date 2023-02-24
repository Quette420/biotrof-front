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
                <th>Отгружено</th>
                <th>Ожидает отгрузки</th>
                <th>Изготовление</th>
                <th>Подписание</th>
                <th>Ожидает оплаты</th>
              </tr>
              </thead>

              <tbody>
              <tr>
                <td>За год</td>
                <td>{{yearlySum}} ₽</td>
                <td>{{yearlyClosed}} ₽</td>
                <td>{{yearlyReadyForShipment}} ₽</td>
                <td>{{yearlyManufacture}} ₽</td>
                <td>{{yearlySigning}} ₽</td>
                <td>{{yearlyWaitingForPayment}} ₽</td>
              </tr>
              <tr>
                <td>За месяц</td>
                <td>{{monthlySum}} ₽</td>
                <td>{{monthlyClosed}} ₽</td>
                <td>{{monthlyReadyForShipment}} ₽</td>
                <td>{{monthlyManufacture}} ₽</td>
                <td>{{monthlySigning}} ₽</td>
                <td>{{monthlyWaitingForPayment}} ₽</td>
              </tr>
              <tr>
                <td>За неделю</td>
                <td>{{weeklySum}} ₽</td>
                <td>{{weeklyClosed}} ₽</td>
                <td>{{weeklyReadyForShipment}} ₽</td>
                <td>{{weeklyManufacture}} ₽</td>
                <td>{{weeklySigning}} ₽</td>
                <td>{{weeklyWaitingForPayment}} ₽</td>
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
    weeklyWaitingForPayment: {
      type: Number,
      default() {
        0
      }
    },
    weeklySigning: {
      type: Number,
      default() {
        0
      }
    },
    weeklyManufacture: {
      type: Number,
      default() {
        0
      }
    },
    weeklyReadyForShipment: {
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
    monthlyWaitingForPayment: {
      type: Number,
      default() {
        0
      }
    },
    monthlySigning: {
      type: Number,
      default() {
        0
      }
    },
    monthlyManufacture: {
      type: Number,
      default() {
        0
      }
    },
    monthlyReadyForShipment: {
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
    yearlyWaitingForPayment: {
      type: Number,
      default() {
        0
      }
    },
    yearlySigning: {
      type: Number,
      default() {
        0
      }
    },
    yearlyManufacture: {
      type: Number,
      default() {
        0
      }
    },
    yearlyReadyForShipment: {
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