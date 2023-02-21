<template>
    <table>
        <thead>
        <tr>
          <th>#</th>
          <th>Название товара</th>
          <th>Категория</th>
          <th>Сумма</th>
          <th>Вес</th>
          <th>Дата создания</th>
          <th>Палнируемая дата доставки</th>
          <th>Статус</th>
          <th>Открыть</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="order of orders" :key="order.id">
          <td>{{order.id}}</td>
          <td>{{order.productName}}</td>
          <td>{{order.category}}</td>
          <td>{{order.price}} ₽</td>
          <td>{{order.weight}}</td>
          <td>{{order.createDate}}</td>
          <td>{{order.plannedDateOfShipment}}</td>
          <td>
            <span 
             
            :class="[order.typeClass]"
            class="white-text badge"
            >{{order.stage}}</span>
          </td>
          <td>
            <button class="btn-small btn" 
            @click="$router.push('/detail/' + order.id)">
              <i class="material-icons">open_in_new</i>
            </button>
          </td>
        </tr>
        
        </tbody>
      </table>
</template>

<script>


export default {
  name: 'history-table',
  props: {
    orders: {
        required: true,
        type: Array
    }
  },
  data: () => ({
    color: 'green'
  }), methods: {
    
  }

}
</script>

<style>

span.badge {
  min-width: 9rem;
  height: 30px;
  border: solid;
  border-color: black;
  border-width: 2px 
}
</style>