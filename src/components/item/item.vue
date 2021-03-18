<template>
  <div>
    <section class="car-item" v-for="(item, index) in itemData" :key="index">
      <header>
        <h4 class="cars-logo">
<!--          <img class="brand-logo" :src="brand.img" alt="Mustang 2019款">-->
          <span class="cars-name">{{ carInfo.name }} 2020款</span>
        </h4>
        <p class="cars-attr" > 5座轿车</p>
      </header>
      <div class="car-content">
        <div class="info">
          <div>
            <!--            <h4 class="car-number">粤 B745NB</h4>-->
            <div>
              <!--              <ul class="car-eletric active-li-1">-->
              <!--                <li></li>-->
              <!--                <li></li>-->
              <!--                <li></li>-->
              <!--                <li></li>-->
              <!--                <li></li>-->
              <!--                <li></li>-->
              <!--                <li></li>-->
              <!--                <li></li>-->
              <!--                <li></li>-->
              <!--                <li></li>-->
              <!--              </ul>-->
              <!--              <p class="distance">-->
              <!--                <sub>约</sub>-->
              <!--                <strong>600</strong>-->
              <!--                <sub>KM</sub>-->
              <!--              </p>-->
            </div>
          </div>
        </div>
        <img :src="carInfo.image" alt="">
      </div>
      <footer>
        <a class="parking-lot" @click="getInfo(car.id, car, index);">详情</a>
      </footer>
    </section>
  </div>
</template>

<script>
export default {
  name: "carItem",
  data(){
    return{
      itemData: [],
      carInfo: {},
    }
  },
  methods :{

  },
  created() {
    this.$itemApi.get("/item/carId/"+this.$route.params.carId, null, res => {
      // console.log(this.$route.params.carId)
      this.itemData = res.data.data
      console.log(this.itemData)
    })
    this.$carApi.get('brand/carInfo/single/'+this.$route.params.carId,null,(res) => {
      this.carInfo = res.data.data;
    })
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";

</style>