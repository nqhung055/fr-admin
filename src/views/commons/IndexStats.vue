<template>
  <app-card>
    <div class="d-custom-flex justify-space-between">
      <div>
        <h4>{{title}}</h4>
        <h4 class="mb-2">
          {{value}}
          <i
            :class="[{'ti-arrow-up success--text ml-2': status === 1, 'ti-arrow-down warning--text ml-2': status === 0 }]"
          ></i>
        </h4>
        <!-- <p class="fs-12 fw-normal grey--text mb-0">+{{body}}% from yesterday</p> -->
      </div>
    </div>
  </app-card>
</template>

<script>
export default {
  props: ["title", "value", "body", "status", "data", "color", "labels"],
  components: {},
};
</script>

