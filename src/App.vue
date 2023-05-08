
 <!-- we are using composition api here, so setup attribute is needed -->
<script setup>
  import {shallowRef, ref, computed, watch, nextTick, onMounted} from "vue";
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
  
  // watch in vue is equivalent to useEffect in react
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

  
onMounted(() => {
document.querySelector(".wt").style.color = "grey";
})
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


</script>

<template>
  <div>
  <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div>


</div>


  
 <main class="p-3 rounded-4">
  <h1 class="wt">Weight Tracker</h1>
<i class="fa-solid fa-house"></i>
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

<style  scoped>
/* .wt{
  color: red;
} */
</style>