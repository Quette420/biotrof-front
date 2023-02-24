<template>
    <div class="col s12 m6 l3">
        <div class="card bill-card" id="dashboard-closed-card">
          <div class="card-content white-text">
            
            
            <h4 >
              <span>{{sum}} <br /> {{text}}</span>
            </h4>
            
          </div>
        </div>
    </div>
</template>

<script>

export default {
  name: "dashboard-closed-bill",
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
.card#dashboard-closed-card {
    background: rgb(127,137,255);
  background: linear-gradient(141deg, rgba(127,137,255,1) 0%, rgba(13,216,255,1) 100%);
  text-align: center;
 
}
</style>