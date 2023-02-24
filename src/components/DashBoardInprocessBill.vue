<template>
    <div class="col s12 m6 l3">
        <div class="card bill-card" id="dashboard-in-process-card">
          <div class="card-content white-text">
            
            
            <h4 >
              <span>{{sum}} <br /> {{text}} </span>
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
  background: rgb(54,168,195);
  background: linear-gradient(141deg, rgba(54,168,195,1) 0%, rgba(93,221,180,1) 100%);
  text-align: center;
 
}

</style>