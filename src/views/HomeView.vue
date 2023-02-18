<template>
  <div>
    <div class="page-title">
      <h3>Сводка по моим заказам</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <MyLoader v-if="loading"/>

    <div v-else class="row">
      <WeeklyBill />
      <MounthBill />
      <YearBill />
      <HomeCurrency />
    </div>
  </div>
</template>

<script>

import MyLoader from '@/components/app/MyLoader.vue';
import WeeklyBill from '@/components/WeeklyBill.vue';
import MounthBill from '@/components/MounthBill.vue';
import YearBill from '@/components/YearBill.vue';
import HomeCurrency from '@/components/HomeCurrency.vue';

export default {
  name: 'home-vue',
  data: () => ({
    loading: true,
    currency: null
  }),
  components: {
    WeeklyBill,
    MounthBill,
    YearBill,
    HomeCurrency,
    MyLoader
}, mounted () {

  this.loading = false;
}
}
</script>