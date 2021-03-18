import Vue from "vue";
import VueMap from "vue-amap";

Vue.use(VueMap);
VueMap.initAMapApiLoader({
  // 高德key 自己到官网申请
  key: "586fede6dede6d7369d1b29890710d5a",
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})