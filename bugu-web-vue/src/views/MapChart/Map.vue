<template>
  <div>
    <map-chart></map-chart>  
  </div>
</template>

<script>
import mapChart from '@/components/Map_echarts'
export default {
  components: {
    mapChart,
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
