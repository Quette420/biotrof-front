<template>
    <div class="col">
        <div class="card bill-card" id="weekly-dash-card">
          <div class="card-content white-text">
            
            
            <h4 >
              <span>{{sum}} {{ text }}</span>
            </h4>
            
          </div>
        </div>
    </div>
</template>

<script>

export default {
  name: "dashboard-bill",
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
.card#weekly-dash-card {
    background: rgb(144,144,249);
  background: linear-gradient(141deg, rgba(144,144,249,1) 0%, rgba(216,117,220,1) 100%);
  text-align: center;
  height: 150px;
  width: 380px;
  flex: auto;
}

</style>