<template>
    <div class="col s16 m6 l3">
        <div class="card bill-card" id="dashboard-gain-card">
          <div class="card-content white-text">
            
            
            <h5>
              <span>{{sum}} ₽<br /> {{ text }}</span>
            </h5>
            
          </div>
        </div>
    </div>
</template>

<script>

export default {
  name: "dashboard-gain-bill",
  props: {
    sum: {
      type: Number,
      default() {
        0
    }},
    text: {
        type: String,
        default () {
            ''
        }
    }
  }

}

</script>

<style>
.card#dashboard-gain-card {
  background: rgb(20,167,209);
  background: linear-gradient(157deg, rgba(20,167,209,1) 0%, rgba(221,233,70,1) 100%);
  text-align: center;

}
.dashboard-gain-card {
  height: 25%;
}
</style>