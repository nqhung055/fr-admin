<template>
  <div class="d-custom-flex align-items-center justify-space-between">
    <div>
      <p class="d-block fw-bold">{{title}}</p>
      <h2 v-bind:class="value_class">
        {{value}}
        <!-- <i
          :class="[{'ti-arrow-up success--text ml-2': status ===1, 'ti-arrow-down warning--text ml-2': status ===0 }]"
        ></i> -->
      </h2>
      <p class="fs-12 fw-normal grey--text mb-0">{{body}}</p>
    </div>
    <div>
      <radial-progress-bar
        :diameter="diameter_value"
        :completed-steps="completed_steps_value"
        :total-steps="total_steps_value"
        v-bind:startColor="start_color_value"
        v-bind:stopColor="stop_color_value"
        :strokeWidth="stroke_width_value"
        v-bind:innerStrokeColor="inner_stroke_color_value"
        class="mx-auto my-6"
      >
        <i v-bind:class="i_class"></i>
      </radial-progress-bar>
    </div>
  </div>
</template>

<script>
import RadialProgressBar from "vue-radial-progress";

export default {
  props: [
    "title",
    "value_class",
    "value",
    "diameter_value",
    "completed_steps_value",
    "total_steps_value",
    "start_color_value",
    "stop_color_value",
    "stroke_width_value",
    "inner_stroke_color_value",
    "i_class",
    "body",
    "status",
  ],
  components: {
    RadialProgressBar,
  },
};
</script>

