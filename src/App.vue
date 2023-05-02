<template>
  <div>
<h1>test</h1>
  </div>
</template>

<script>
  import {shallowRef, ref, computed, watch, nextTick} from "vue";
  import { Chart } from "chart.js/auto";
   const weights = ref([]);
   const weightChartEl = ref(null);
   const weightChart= shallowRef(null);
   const weightInput= ref(60.0);
   const currentWeight= computed(()=>{
      return weights.value.sort((a,b)=> b.date - a.date)[0] || {weight:0}
   });

</script>

<style lang="scss" scoped>

</style>