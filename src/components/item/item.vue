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

            </div>
          </div>
        </div>
        <img :src="carInfo.image" alt="">
      </div>
      <footer>
        <a class="parking-lot" @click="getItemInfo">{{item.price}}元/天 <span style="margin-left: 200px">了解详情</span></a>
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
            <span style="float: right; font-size: 30px; color: #409eff"> 结算：{{value * item.price}} 元</span>
          </div>
        </div>
        <el-button class="car-select-btn" style=" line-height: 20px; margin-left: 230px; margin-top: 20px" plain @click="payAccount(item.price, item.id)">租赁车辆</el-button>
      </el-dialog>


      <el-dialog
          v-model="dialogFormVisible"
          :visible="dialogFormVisible"
          :append-to-body="true"
          @close="closeInfo"
          :title="carInfo.name +' '+ item.num"
      >
        <center>{{item.itemDesc.desc}}</center>
        <br/>
        <div>
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
        </div>

        <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogFormVisible = false">再去看看</el-button>
      <el-button type="primary" @click="toRental">立即租车！</el-button>
    </span>
        </template>
      </el-dialog>

      <el-dialog
        v-model="getCar"
        :visible="getCar"
        :append-to-body="true"
        @close="closeAccount"
        title="租赁车辆"
      >
        <el-button type="primary" icon="el-icon-edit">
          <a :href="'https://uri.amap.com/marker?position='+item.addressX+','+item.addressY+'&name=取车停车场'" target="_blank">
            <p class="title">去取车</p>
          </a>
        </el-button>
      </el-dialog>
    </section>




  </div>
</template>

<script>
import router from "../../router";

export default {
  name: "carItem",
  data(){
    return{
      amount: 0,
      value: 0,
      itemData: [],
      carInfo: {},
      dialogFormVisible: false,
      dialogVisible:false,
      getCar: false,
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
      user:{},
    }
  },
  methods :{
    payAccount(price, id){
      this.order.orderAmount = this.value * price;
      //alert(this.order.orderAmount)
      this.user = JSON.parse(sessionStorage.getItem("user"));
      this.order.userId = this.user.id;
      this.order.itemId = id;
      //alert(this.order.userId)
      this.$orderApi.post(true, "/order/addOrder",this.order, res =>{
          console.log(res)
        if (res.data.code === 10001){
          this.$message({
            dangerouslyUseHTMLString:true,
            message:res.data.data,
            type:'error'
          });
          this.$router.push("/carItem")
        }
        if (res.data.code === 10000){
            this.getCar = true
        }

      })
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
  height: 300px;
  margin: auto;
  position: absolute;
}

.itemDesc:hover{
  transform: scale(1.2);
  transition: all .3s
}

.box-card {
  margin-bottom: 5px;
  height: 345px;
  width: 490px;
  margin-left: 245px;
}
.liButton{
  width: 300px;

}


</style>