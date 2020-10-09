<template>
  <app-card>
    <div class="d-custom-flex justify-space-between">
      <div>
        <h4>{{title}}</h4>
        <v-row justify="center">
          <h1 class="mb-2">
            {{value}}
            <!-- <i :class="[{'ti-arrow-up success--text ml-2': status === 1, 'ti-arrow-down warning--text ml-2': status === 0 }]" /> -->
          </h1>
        </v-row>
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

