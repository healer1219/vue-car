<template>
  <div>

    <p v-if="itemData[0] == null" style="color: white; text-align: center" @click="goCarList">当前车型很热门，都被租走了呢！<br/>再看看别的车型吧</p>
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
        <a class="parking-lot" @click="getItemInfo(index)">{{item.price}}元/天 <span style="margin-left: 200px">了解详情</span></a>
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
        v-model="getCar"
        :visible="getCar"
        :append-to-body="true"
        @close="closeAccount"
        title="租赁车辆"
        style="text-align: center"
      >

          <ul>
            <table>
              <tr>
                <td>车牌号</td>
                <td>车型</td>
                <td>用户名</td>
                <td>手机号</td>
              </tr>
              <tr>
                <td>{{item.num}}</td>
                <td>{{carInfo.name}}</td>
                <td>{{ user.username }}</td>
                <td>{{user.phone}}</td>
              </tr>
            </table>
            <li></li>
            <li></li>
            <li></li>
            <li>
              <el-button type="primary" style="margin-top: 10px; text-align: center;" icon="el-icon-s-promotion" round @click="returnItem">
                <a :href="'https://uri.amap.com/marker?position='+item.addressX+','+item.addressY+'&name=取车停车场'" target="_blank" style="color: white">
                  去取车
                </a>
              </el-button>
              <el-button type="success" style="margin-top: 10px;margin-left: 20px; text-align: center;" icon="el-icon-s-promotion" round @click="goCarList">
                <a style="color: white">
                  再看看
                </a>
              </el-button>
            </li>
          </ul>

      </el-dialog>
    </section>

    <el-dialog
      v-model="dialogFormVisible"
      :visible="dialogFormVisible"
      :append-to-body="true"
      @close="closeInfo"
      :title="carInfo.name +' '+ carData.num"
    >
      <center>{{carData.itemDesc.desc}}</center>
      <br/>
      <div style="margin-right: 100px">
        <el-card class="box-card">
          <div >
            <p>{{carData.itemDesc.frontDesc}}</p>
            <img :src="carData.id+'/'+carData.itemDesc.frontImg" alt="" class="itemDesc">
          </div>
        </el-card>

        <el-card class="box-card">
          <div >
            <p>{{carData.itemDesc.frontLeftDesc}}</p>
            <img :src="carData.id+'/'+carData.itemDesc.frontLeftImg" alt="" class="itemDesc">
          </div>
        </el-card>

        <el-card class="box-card">
          <div>
            <p>{{carData.itemDesc.frontRightDesc}}</p>
            <img :src="carData.id+'/'+carData.itemDesc.frontRightImg" alt="" class="itemDesc">
          </div>
        </el-card>

        <el-card class="box-card">
          <div >
            <p>{{carData.itemDesc.backDesc}}</p>
            <img :src="carData.id+'/'+carData.itemDesc.backImg" alt="" class="itemDesc">
          </div>
        </el-card>

        <el-card class="box-card">
          <div >
            <p>{{carData.itemDesc.backLeftDesc}}</p>
            <img :src="carData.id+'/'+carData.itemDesc.backLeftImg" alt="" class="itemDesc">
          </div>
        </el-card>

        <el-card class="box-card">
          <div >
            <p>{{carData.itemDesc.backRightDesc}}</p>
            <img :src="carData.id+'/'+carData.itemDesc.backRightImg" alt="" class="itemDesc">
          </div>
        </el-card>

        <el-card class="box-card">
          <div >
            <p>{{carData.itemDesc.insideDesc}}</p>
            <img :src="carData.id+'/'+carData.itemDesc.insideImg" alt="" class="itemDesc">
          </div>
        </el-card>
        <el-card class="box-card">
          <div>
            <p>{{carData.itemDesc.insideBackDesc}}</p>
            <img :src="carData.id+'/'+carData.itemDesc.insideBackImg" alt="" class="itemDesc">
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

  </div>


</template>

<script>
import router from "../../router";
import item from "@/api/item/item";

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
      carData: {
        "id": "1",
        "num": "京123456",
        "carId": "1",
        "status": 1,
        "price": 100,
        "addressX": "116.593642",
        "addressY": "39.920173",
        "itemDesc": {
          "id": "1",
          "frontImg": "f.jpg",
          "frontDesc": null,
          "frontLeftImg": "fl.jpg",
          "frontLeftDesc": null,
          "frontRightImg": "fr.jpg",
          "frontRightDesc": null,
          "backImg": "b.jpg",
          "backDesc": null,
          "backLeftImg": "bl.jpg",
          "backLeftDesc": null,
          "backRightImg": "br.jpg",
          "backRightDesc": null,
          "insideImg": "inside.jpg",
          "insideDesc": null,
          "insideFrontImg": "insidef.jpg",
          "insideFrontDesc": null,
          "insideBackImg": "insideb.jpg",
          "insideBackDesc": null,
          "desc": "车况良好，无明显损伤"
        }
      }

    }
  },
  methods:{
    goCarList(){
      router.push("/carItem")
    },
    returnItem(){
      router.push("/carItem")
      this.$orderApi.post(true,"/order/change",this.order, res => {
        console.log(this.order)
        console.log(res)
      })
    },
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
            this.order = res.data.data
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
    getItemInfo(index) {

      this.carData = { ...this.itemData[index] }
      this.dialogFormVisible = true;
      console.log(carData);
    },
    toRental(){
      this.dialogVisible = true;
    }
  },
  created() {
    this.$itemApi.get("/item/carId/"+this.$route.params.carId, null, res => {
      // console.log(this.$route.params.carId)
      this.itemData = { ...res.data.data }
      // console.log("1111",{...res.data.data});
      // console.log(this.itemData)
      console.log(this.itemData);

    })
    this.$carApi.get('brand/carInfo/single/'+this.$route.params.carId,null,(res) => {
      this.carInfo = res.data.data;
    })
  }
};
</script>

<style lang="scss" scoped>
@import "./style.scss";

table{
  border-collapse: collapse;
  width: 500px;
  margin-left: 125px;
}

tr {
  height: 30px;
}

td{
  display:table-cell;
  vertical-align:middle
}

table, tr, th, td {
  border: 1px solid black;
  text-align: center;
}
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
  margin-left: 125px;
}
.liButton{
  width: 300px;

}


</style>