<template>
  <div class="visitor-area-chart">
    <div class="d-custom-flex justify-space-between mb-5 label-wrap">
      <h4>{{$t('message.temperature')}}</h4>
      <div class="d-custom-flex justify-space-between w-30">
        <div class="w-50">
          <h4 class="info--text mb-0">35</h4>
          <p class="fs-12 grey--text mb-0 fw-normal">{{$t('message.pass')}}</p><!-- {{$t(message.pass)}} -->
        </div>
        <div class="w-50">
          <h4 class="primary--text mb-0">54</h4>
          <p class="fs-12 grey--text mb-0 fw-normal">{{$t('message.failed')}}</p><!-- {{$t(message.failed)}} -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:[],
  components: {
  },
};
</script>

