<template>
  <div>
    <!-- 菜单 -->
    <carBar />
    <!-- 汽车列表 -->
    <!-- <car /> -->

    <!-- 地图 -->
    <amap />


    
    <!-- 会员 -->
    <div id="children-wrap" :class="{open: show}">
      <el-button type="primary" icon="el-icon-close" style="background-color:#34393f; border: 0px" @click="closeDash"></el-button>
      <router-view />
    </div>
  </div>
</template>

<script>
import amap from '@/views/amap/index'
import car from '@/views/car/index'
import user from '@/views/users/index'
import carBar from '@/components/carBar/carBar'
import carList from '@/components/carList/carItem'
export default {
  components: {
    amap,
    car,
    user,
    carBar,
    carList
  },
  data () {
    return {
      // show: false
    }
  },
  methods: {
    closeDash(){
       this.$router.push({
         name: "Index"
       })
    },
  },
  computed: {

    show() {
      return this.$route.name == "Index" ? false : true;
    }
  },
  // mounted() {
  //   document.addEventListener("mouseup", (e) => {
  //     let userComponent = document.getElementById("children-wrap")
  //     console.log(userComponent)
  //     if (userComponent && !userComponent.contains(e.target)) {
  //         this.$router.push({
  //           name: "Index"
  //         })
  //     }
  //   })
  // },
  watch: {
    
  }
}
</script>

<style lang="scss">
  #children-wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    right: -600px;
    z-index: 101;
    width: 410px;
    background: #34393f;
    transition: all .3s ease 0s;
    -moz-transition: all .3s ease 0s;
    -ms-transition: all .3s ease 0s;
    -o-transition: all .3s ease 0s;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .element::-webkit-scrollbar { width: 0 !important }
  #children-wrap.open {
    right: 0;
  }
</style>