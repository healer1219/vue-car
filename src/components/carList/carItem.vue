<template>
  <div>
   <section class="car-item">
      <header>
        <h4 class="cars-logo">
          <img src="~@/assets/img/cars-logo.png" alt="Mustang 2019款">
          <span class="cars-name">Mustang 2019款</span>
        </h4>
        <p class="cars-attr">新能源汽车 5座</p>
      </header>
      <div class="car-content">
        <div class="info">
          <div>
            <h4 class="car-number">粤 B745NB</h4>
            <div>
              <ul class="car-eletric active-li-1">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <p class="distance">
                <sub>约</sub>
                <strong>600</strong>
                <sub>KM</sub>
              </p>
            </div>
          </div>
        </div>
        <img src="~@/assets/img/pic001.jpg" alt="">
      </div>
      <footer>
        <a href="" class="parking-lot">某某停车场</a>
      </footer>
    </section>
    <section class="car-brand" v-for="(brand,index) in carList" :key="index">
      <header>
        <h4 class="cars-logo" >
          <span class="cars-name">{{ brand.name }}</span>
          <img :src="brand.img" alt="上汽大众" style="height: 40px">
            <el-button style="float: right" @click="toCarList(brand.id)">车型</el-button>
        </h4>

      </header>

    </section>
  </div>
</template>
<script>
  export default {
    name: "carItem",
    data(){
      return {
        count: 0,
        dialogVisible: false,
        carList:[],
        infoList:[],
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      toCarList(id){
        sessionStorage.setItem("brandId",id);
        this.$router.push('/carList/' + id)
      },
      load () {
        this.count += 2
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      getCarInfo(){
        this.$carApi.get('/brand/carInfo/', this.carList[0].id,res => {
          // this.dialogVisible = true
          console.log(res)
          this.infoList = res.data.data
          console.log(this.infoList)
        })
      },
      toList(){
        this.$router.push({
          name:"carList"
        })
      }
    },
    mounted() {
      this.$carApi.get('/brand', null, response =>{
        console.log(response)
        this.carList = response.data.data
      })
    }
  }
</script>
<style lang="scss" scoped>
  @import "./style.scss";
  .brand{
    margin-top: 20px;
  }
  .brand-logo{
    height: 34px;
    margin-left: 60px;
  }
</style>
