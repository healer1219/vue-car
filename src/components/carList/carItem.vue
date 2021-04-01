<template>
  <div>
   <section v-if="getOrder" class="car-item">
      <header>
        <h4 class="cars-logo">
          <img :src="brand.img" :alt="carInfo.name" style="height: 45px">
          <span class="cars-name">{{ carInfo.name }}</span>
        </h4>
        <p class="cars-attr">正在进行中的订单</p>
      </header>
      <div class="car-content">
        <div class="info">
          <div>
            <h4 class="car-number">{{ item.num }}</h4>
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
        <img :src="carInfo.image" alt="">
      </div>
      <footer>
        <a v-if="order.status == 1" class="parking-lot" :href="'https://uri.amap.com/marker?position='+item.addressX+','+item.addressY+'&name=取车停车场'" target="_blank" @click="returnCar">
          去还车
        </a>
        <a v-else class="parking-lot" :href="'https://uri.amap.com/marker?position='+item.addressX+','+item.addressY+'&name=取车停车场'" target="_blank" @click="returnCar">
          去取车
        </a>

      </footer>
    </section>
    <section v-else class="car-brand">
      <header>
        <h3 class="cars-attr">没有正在进行中的订单哦! &nbsp;</h3>
        <p class="cars-attr">快去选车吧！</p>
      </header>

    </section>

    <section class="car-item"  style="margin-top: 5px">
      <header>
        <h4 class="cars-logo">
          <img :src="mostPopularBrand.img" style="height: 45px">
          <span class="cars-name">{{ mostPopularCarOfAll.name }} 2020款</span>
        </h4>
        <p class="cars-attr" >最受欢迎车型</p>
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
        <img :src="mostPopularCarOfAll.image" alt="">
      </div>
      <footer>
        <a class="parking-lot" @click="getItem(mostPopularCarOfAll.id)">详情</a>
      </footer>
    </section>

    <div style="margin-top: 5px">
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

  </div>
</template>
<script>
  export default {
    name: "carItem",
    data(){
      return {
        mostPopularCarOfAll:{},
        mostPopularBrand:{},
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
        },
        order: {
          "id": 0,
          "orderNo": "",
          "orderAmount": 0.0,
          "consignee": "",
          "address": "",
          "phone": "",
          "status": 0,
          "userId": "",
          "createTime": null,
          "updateTime": null,
          "itemId": 0
        },
        carInfo:{},
        item:{},
        brand:{},
        getOrder: true,
      }
    },
    methods: {
      getItem(carId){
        console.log(carId)
        this.dialogFormVisible = false;
        this.$router.push("/item/"+carId)
      },
      returnCar(){
        this.$orderApi.post(true,"/order/change",this.order, res => {
          console.log(res)
          location.reload();
        })
      },
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
      let user = JSON.parse(sessionStorage.getItem("user"));

      this.$carApi.get('/brand', null, response =>{
        console.log(response)
        this.carList = response.data.data
      })

      this.$carApi.get('/brand/carInfo/popular', null, response =>{
        console.log(response)
        this.mostPopularCarOfAll = response.data.data
        this.$carApi.get('/brand/'+this.mostPopularCarOfAll.brandId, null, response =>{
          console.log(response)
          this.mostPopularBrand= response.data.data
        })
      })

      this.$orderApi.get("/order/userOrder/"+user.id, null, res => {
        //console.log(res)
        if (res.data.code === 10001){
          this.getOrder = false;
        }
        this.order = res.data.data
        this.$itemApi.get("/item/"+this.order.itemId, null, res => {
          //console.log(res)
          let item = res.data.data;
          this.item = item;
          this.$carApi.get('brand/carInfo/single/'+item.carId,null,(res) => {
            this.carInfo = res.data.data;
            //console.log(res.data.data)
            let carInfo = res.data.data;
            this.$carApi.get('/brand/'+carInfo.brandId, null, response =>{
              //console.log(response)
              this.brand= response.data.data
            })
          })
        })
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
