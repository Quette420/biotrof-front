<template>
  <div>
    <button class="btn-small btn"  @click="alertClick"><i class="material-icons">open_in_new</i></button>
    
  </div>
</template>

<script>

export default {
   methods: {
    alertClick () {
        this.$router.push('/detail/' + this.params.value)
    }
   }
}
</script>

<style>

</style>