
 <!-- we are using composition api here, so setup attribute is needed -->
<script setup>
  import {shallowRef, ref, computed, watch, nextTick} from "vue";
  import { Chart } from "chart.js/auto";  
  // ref will return object with key name as "value"
  const weights =ref([]);
  //  chart element
  const weightChartEl = ref(null);
  const weightChart= shallowRef(null);
  //  input value
  const weightInput= ref(60.0);
  const currentWeight= computed(()=>{
      return weights.value.sort((a,b)=> b.date - a.date)[0] || {weight:0}
  });
  // adding weight
  const addWeight = ()=>{
    // console.log(weights.value)
    weights.value.push({
      weight: weightInput.value,
      date: new Date().getTime(),
    })
  }

  // watching weights 
  watch(weights, newWeights => {
    const ws = [...newWeights]
if(weightChart.value){
  weightChart.value.data.labels =  ws.sort((a,b)=> a.date - b.date).map(w=> new Date(w.date).toLocaleDateString()).slice(-7);
  weightChart.value.data.datasets[0].data = ws.sort((a,b)=> a.date - b.date).map(w=> w.weight).slice(-7);
  weightChart.value.update();
  return; 
}

    nextTick(()=>{
      // console.log(weightChartEl);
        // for line chart in chartjs
weightChart.value  = new Chart(weightChartEl.value, {
    type: "line",
    data: {
    labels: ws.sort((a,b)=> a.date - b.date).map(w=> new Date(w.date).toLocaleDateString()),
     datasets: [
      {
        label: "Weight",
        data: ws.sort((a,b)=> a.date - b.date).map(w=> w.weight) ,
        backgroundColor: "rgba(54,73,93,.5)",
        borderColor: "#36495d",
        borderWidth: 3
      },
      
    ]
  },
  options: {
    responsive: true,
    lineTension: 1,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            padding: 25
          }
        }
      ]
    }
  }
});

    })
  }, {deep:true})

  

  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


</script>

<template>
 <main class="p-3 rounded-4">
  <h1>Weight Tracker</h1>
  <div class="current">
    <span class="lead fw-bold fs-3">{{currentWeight.weight}}</span>
    <div>
      <small class="text-muted mb-2 d-block">current weight</small>
    </div>      
  </div>
<!-- form -->
  <form @submit.prevent="addWeight" class="d-flex gap-1 mx-auto justify-content-center pb-4">
<input type="number" name="" id="" step="0.1" v-model="weightInput">
<input type="submit" value="Add weight">
  </form>

<!-- chart section-->
  <div class="pb-4" v-if="weights && weights.length > 0">
<h2>last 7 days</h2>
<!-- canvas -->
<div class="canvas-box">
  <canvas ref="weightChartEl"></canvas>
</div>

<!-- weight history -->
<div class="weight-history mt-4">
  <h2>Weight history</h2>
  <ul class="list-unstyled">
    <li class="pb-2 border-bottom border-1 " v-for="weight in weights" :key="weight.id">
    <span class="lead">{{ weight.weight }}kg </span>
    <small>{{ new Date(weight.date).toLocaleDateString("en-US", options) }}</small>
    </li>
  </ul>
</div>
  </div>
 </main>
</template>

<style lang="scss" scoped>

</style>