<template>
  <div class="car-wrap">
    <div class="cars-swiper-wrap">
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide><car-item height="800px" /></swiper-slide>
        <swiper-slide><car-item /></swiper-slide>
        <swiper-slide><car-item /></swiper-slide>
        <swiper-slide><car-item /></swiper-slide>
        <swiper-slide><car-item /></swiper-slide>
      </swiper>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </div>
  </div>
</template>
<script>
import carItem from '@/components/carList/carItem'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  components: {
    Swiper,
    SwiperSlide,
    carItem
  },
  data () {
    return {
        swiperOption: {
          slidesPerView: 3,
          spaceBetween: 30,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    },
    methods: {
      btn() {
        this.$router.push({
          name: 'User'
        })
      }
    }
  }
</script>

<style lang="scss">
  @import 'swiper/swiper.scss';
  .car-wrap {
    position: fixed;
    bottom: 94px;
    left: 0;
    right: 0;
    z-index: 11;
  }
  .cars-swiper-wrap {
    position: relative;
    padding: 0 155px;
    .swiper-container {
      overflow: initial;
    }
    .swiper-button-prev,
    .swiper-button-next {
      top: 50%;
      width: 60px;
      height: 100px;
      margin-top: -50px;
      border-radius: 100px;
      background-color: #fff;
      outline: none;
      @include webkit(box-shadow, 0 0 18px 0 rgba(0,0,0,.2));
      &.swiper-button-disabled {
        opacity: 1;
      }
      &:hover{
        background: $color-main;
      }
    }
    .swiper-button-prev {
      left: 53px;
      &:after {
        content: "";
        width: 17px;
        height: 17px;
        margin-left: 5px;
        border-left: 3px solid #000;
        border-top: 3px solid #000;
        @include webkit(transform, rotate(-45deg));
        @include webkit(box-sizing, border-box);
      }
      &:hover {
        &:after {
          border-left: 3px solid $color-blue;
          border-top: 3px solid $color-blue;
        }
      }
    }
    .swiper-button-next {
      right: 53px;
      &:after {
        content: "";
        width: 17px;
        height: 17px;
        margin-right: 5px;
        border-right: 3px solid #000;
        border-top: 3px solid #000;
        @include webkit(transform, rotate(45deg));
        @include webkit(box-sizing, border-box);
      }
      &:hover {
        &:after {
          border-right: 3px solid $color-blue;
          border-top: 3px solid $color-blue;
        }
      }
    }
  }
</style> 