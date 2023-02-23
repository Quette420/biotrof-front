<template>
    <div class="col">
        <div class="card bill-card" id="dashboard-in-process-card">
          <div class="card-content white-text">
            
            
            <h4 >
              <span>{{sum}} {{text}} </span>
            </h4>
            
          </div>
        </div>
    </div>
</template>

<script>

export default {
  name: "dashboard-in-process-bill",
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
.card#dashboard-in-process-card {
    background: rgb(20,167,209);
background: linear-gradient(157deg, rgba(20,167,209,1) 0%, rgba(221,233,70,1) 100%);
  text-align: center;
  height: 150px;
  width: 380px;
  flex: auto;
}

</style>