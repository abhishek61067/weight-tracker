
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
    nextTick(()=>{
      // console.log(weightChartEl);
        // for line chart in chartjs
weightChart.value  = new Chart(weightChartEl.value, {
   type: "line",
  data: {
    labels: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"],
    datasets: [
      {
        label: "Number of Moons",
        data: [0, 0, 1, 2, 79, 82, 27, 14],
        backgroundColor: "rgba(54,73,93,.5)",
        borderColor: "#36495d",
        borderWidth: 3
      },
      {
        label: "Planetary Mass (relative to the Sun x 10^-6)",
        data: [0.166, 2.081, 3.003, 0.323, 954.792, 285.886, 43.662, 51.514],
        backgroundColor: "rgba(71, 183,132,.5)",
        borderColor: "#47b784",
        borderWidth: 3
      }
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
  <canvas ref="weightChartEl" id="chart"></canvas>
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