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
                        <h4 class="car-number">{{ item.num }}</h4>
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
        <a class="parking-lot" @click="getItemInfo">详情</a>
      </footer>



      <el-dialog
          v-model="dialogVisible"
          :visible="dialogVisible"
          :append-to-body="true"
          @close="closeAccount"
          title="租赁车辆"
      >

        <div class="scroll-wrap">
          <h2>选择天数</h2>
          <br/>
          <ul class="car-type-list">
            <li >
              <div>
                <el-slider
                  v-model="value"
                  show-input
                :step="5">
                </el-slider>
              </div>
            </li>
          </ul>
          <div class="clause-dec">
            <span class="pull-left">参保《全面保障服务》用车更放心</span>
            <i class="current"></i>
          </div>
          <br/>
          <br/>
          <div>
            <span style="float: right; font-size: 30px; color: #409eff"> 结算：{{value * 100}} 元</span>
          </div>
        </div>
        <el-button class="car-select-btn" style=" line-height: 20px; margin-left: 230px; margin-top: 20px" plain @click="payAccount">租赁车辆</el-button>
      </el-dialog>


  <el-dialog
          v-model="dialogFormVisible"
          :visible="dialogFormVisible"
          :append-to-body="true"
          @close="closeInfo"
          :title="carInfo.name +' '+ item.num"
      >
        <center>{{item.itemDesc.desc}}</center>
        <el-card class="box-card">
          <div >
            <p>{{item.itemDesc.frontDesc}}</p>
            <img :src="'passat/'+item.itemDesc.frontImg" alt="" class="itemDesc">
          </div>
        </el-card>

        <el-card class="box-card">
          <div >
            <p>{{item.itemDesc.frontLeftDesc}}</p>
            <img :src="'passat/'+item.itemDesc.frontLeftImg" alt="" class="itemDesc">
          </div>
        </el-card>

        <el-card class="box-card">
          <div>
            <p>{{item.itemDesc.frontRightDesc}}</p>
            <img :src="'passat/'+item.itemDesc.frontRightImg" alt="" class="itemDesc">
          </div>
        </el-card>

        <el-card class="box-card">
          <div >
            <p>{{item.itemDesc.backDesc}}</p>
            <img :src="'passat/'+item.itemDesc.backImg" alt="" class="itemDesc">
          </div>
        </el-card>

        <el-card class="box-card">
          <div >
            <p>{{item.itemDesc.backLeftDesc}}</p>
            <img :src="'passat/'+item.itemDesc.backLeftImg" alt="" class="itemDesc">
          </div>
        </el-card>

        <el-card class="box-card">
          <div >
            <p>{{item.itemDesc.backRightDesc}}</p>
            <img :src="'passat/'+item.itemDesc.backRightImg" alt="" class="itemDesc">
          </div>
        </el-card>

        <el-card class="box-card">
          <div >
            <p>{{item.itemDesc.insideDesc}}</p>
            <img :src="'passat/'+item.itemDesc.insideImg" alt="" class="itemDesc">
          </div>
        </el-card>
        <el-card class="box-card">
          <div>
            <p>{{item.itemDesc.insideBackDesc}}</p>
            <img :src="'passat/'+item.itemDesc.insideBackImg" alt="" class="itemDesc">
          </div>
        </el-card>
        <br/>


        <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogFormVisible = false">再去看看</el-button>
      <el-button type="primary" @click="toRental">立即租车！</el-button>
    </span>
        </template>
      </el-dialog>


    </section>




  </div>
</template>

<script>
export default {
  name: "carItem",
  data(){
    return{
      amount: 0,
      value: 0,
      itemData: [],
      carInfo: {},
      dialogFormVisible: false,
      dialogVisible:false
    }
  },
  methods :{
    payAccount(){
      this.amount = this.value * 100

    },
    closeAccount(){
      this.dialogVisible = false
    },
    closeInfo() {
      this.dialogFormVisible = false;
    },
    getItemInfo() {
      this.dialogFormVisible = true;
    },
    toRental(){
      this.dialogVisible = true;
    }
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

.itemDesc{
  height: 200px;
  margin: auto;
  position: absolute;
}

.box-card {
  margin-bottom: 5px;
  height: 245px;
  width: 350px;
  float: left;
}
.liButton{
  width: 300px;

}


</style>