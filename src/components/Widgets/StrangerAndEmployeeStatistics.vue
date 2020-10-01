<template>
   <div class="widget">
      <div class="ladgend-wrapper mb-4">
         <p class="mb-0"><span class="ladgend ladgend-success"></span> <span>Stranger</span></p>
         <p class="mb-0"><span class="ladgend ladgend-warning"></span> <span>Employee</span></p>
      </div>
      <visiting-analysis
         :width="370"
         :height="300"
      >
      </visiting-analysis>
   </div>
</template>

<script>
import VisitingAnalysis from "../Charts/VisitingAnalysisChart";
export default {
  components: {
    VisitingAnalysis
  }
};
</script>
