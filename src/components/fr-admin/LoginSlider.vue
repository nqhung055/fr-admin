<!-- Login Slider -->
<template>
  <div>
    <app-section-loader :status="loader"></app-section-loader>
    <slick :options="slickOptions" v-if="this.lstSliderInfos">
      <template v-for="info in this.lstSliderInfos">
        <div class="session-slider" :key="info.id">
          <div class="slider-content">
            <img :src="info.avatar" class="rounded-circle img-responsive" width="170" height="170" />
            <div class="slider-meta mb-4">
              <span class="d-block client-name fw-bold">
                <i>{{info.name}}</i>
              </span>
              <span class="d-block client-digg">{{info.designation}}</span>
            </div>
            <p class="px-4" style="text-align: justify;">{{info.body}}</p>
          </div>
        </div>
      </template>
    </slick>
    <!-- <slick :options="slickOptions" v-if="testimonials">
      <template v-for="testimonial in testimonials">
        <div class="session-slider" :key="testimonial.id">
          <div class="slider-content">
            <img
              :src="testimonial.avatar"
              class="rounded-circle img-responsive"
              width="170"
              height="170"
            />
            <div class="slider-meta mb-4">
              <span class="d-block client-name fw-bold">
                <i>{{testimonial.name}}</i>
              </span>
              <span class="d-block client-digg">{{testimonial.designation}}</span>
            </div>
            <p class="px-4">{{testimonial.body}}</p>
          </div>
        </div>
      </template>
    </slick>-->
  </div>
</template>
<script>
import Slick from "vue-slick";
import api from "Api";
import { sliderInfos } from "./Slider-Info";
export default {
  components: {
    Slick,
  },
  mounted() {
    this.getTestimonials();
    this.getSliderInfos();
  },
  computed: {
    slickOptions() {
      return {
        dots: true,
        infinite: true,
        speed: 10000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
      };
    },
  },
  data() {
    return {
      loader: true,
      testimonials: null,
      lstSliderInfos: null,
    };
  },
  methods: {
    getTestimonials() {
      api
        .get("https://reactify.theironnetwork.org/data/testimonials.js")
        .then((response) => {
          this.loader = false;
          this.testimonials = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getSliderInfos() {
      if(sliderInfos.data != null){
          this.loader = false;
        return this.lstSliderInfos = sliderInfos.data;
      }
      /* for(var i=0; i < this.lstSliderInfo.length; i++) {
        console.log('Slider Infos: '); 
        //  + sliderInfos[i]["name"]
      } */
    },
  },
};
</script>
