
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
 <main>
  <h1>Weight Tracker</h1>
  <div class="current">
    <span>{{currentWeight.weight}}</span>
    <div>
      <small>cur weight</small>
    </div>      
  </div>
<!-- form -->
  <form @submit.prevent="addWeight">
<input type="number" name="" id="" step="0.1" v-model="weightInput">
<input type="submit" value="Add weight">
  </form>

<!-- chart section-->
  <div v-if="weights && weights.length > 0">
<h2>last 7 days</h2>
<!-- canvas -->
<div class="canvas-box">
  <canvas ref="weightChartEl"></canvas>
</div>

<!-- weight history -->
<div class="weight-history">
  <h2>Weight history</h2>
  <ul>
    <li v-for="weight in weights" :key="weight.id">
    <span>{{ weight.weight }}kg </span>
    <small>{{ new Date(weight.date).toLocaleDateString("en-US", options) }}</small>
    </li>
  </ul>
</div>
  </div>
 </main>
</template>

<style lang="scss" scoped>

</style>