<template>
  <div class="amap-wrap">
    <el-amap vid="amapContainer" :events="events" class="amap-demo"></el-amap>
  </div>
</template>

<script>
import { AMapManager,layzAMapApiLoaderInstance } from 'vue-amap';
// let amapManager = new VueAMap.AMapManager();
export default {
  data () {
    return {
      zoom: 12,
      amapManager: '',
      center: [121.59996, 31.197646],
      events: {}
      }
    },
  mounted() {
  layzAMapApiLoaderInstance.load().then(() => {
    this.map = new AMap.Map('amapContainer', {
      center: [116.404765,39.918052],
      zoom: this.zoom //初始化地图层级
    })
  })
}
  }
</script>

<style lange="scss">
.amap-wrap {
  height: 100vh;
}
</style>