<template>
  <div>
    <section class="car-item" v-for="(car,index) in carInfos" :key="index" >
      <header>
        <h4 class="cars-logo">
          <img class="brand-logo" :src="brand.img" alt="Mustang 2019款">
          <span class="cars-name">{{ car.name }} 2020款</span>
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
        <img :src="car.image" alt="">
      </div>
      <footer>
        <a class="parking-lot" @click="getInfo(car.id, car, index);">详情</a>
      </footer>
    </section>
    <el-dialog
      v-model="dialogFormVisible"
      :visible="dialogFormVisible"
      :append-to-body="true"
      @close="closeInfo">
      <p>{{carData.name}}</p>
      <el-table :data="carData">
        <el-table-column property="name" label="名称" width="100"></el-table-column>
        <el-table-column property="length" label="轴距" width="100"></el-table-column>
        <el-table-column property="engine" label="发动机型号" width="100"></el-table-column>
        <el-table-column property="enginePower" label="发动机马力" width="100"></el-table-column>
        <el-table-column property="driveMethod" label="驱动形式" width="100"></el-table-column>
        <el-table-column property="fuel" label="燃料形式" width="100"></el-table-column>
        <el-table-column property="gearbox" label="变速箱" width="100"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
      <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="getItem(carData[0].carId)">立即租车！</el-button>
    </span>
      </template>
    </el-dialog>

  </div>
</template>
<script>
  export default {
    name: "carList",
    data(){
      return {
        brand:[],
        carData: [],
        descInfo: {},
        carInfos : [],
        carParents : {},
        pic:"santana.png",
        dialogFormVisible: false,
        descId:"",
        formLabelWidth: '120px'
      }
    },
    methods: {
      getItem(carId){
        console.log(carId)
        this.dialogFormVisible = false;
        this.$router.push("/item/"+carId)
      },
      getInfo (descId ,car, index) {
        let user = JSON.parse(sessionStorage.getItem("user"));
        this.dialogFormVisible=true;
        this.$carApi.get('brand/carInfo/desc/'+descId+'?userId='+user.id, null, res=>{
          console.log(res)
          this.carData = res.data.data
          console.log(this.carData)
          this.descInfo = car
          console.log(this.descInfo)
        })
      },
      closeInfo(){
        this.dialogFormVisible=false;
      },
    },
    created() {
      this.$carApi.get('brand/'+this.$route.params.id, null, response =>{
        console.log(response)
        this.brand = response.data.data
      })
        this.$carApi.get('brand/carInfo/'+this.$route.params.id,null,(res) => {
          console.log(this.$route.params.id)
          console.log(res.data)
          this.carInfos = res.data.data
          console.log(this.carInfos)
        })
    }
  }
</script>
<style lang="scss" scoped>
  @import "./style.scss";
  .item-drawer{
   color: #34393f;
  }
  .box-card{
    width: 300px;
    float: left;
    margin-left: 5px;
    text-align: center;
  }
  .carImg{
    height: 150px;
  }
  .carName{
    text-align: center;
    margin-bottom: 10px;
  }
  table {
    border: 1px solid #c1c1c1;
    border-collapse: collapse;
    border-spacing: 0;
    text-align: center;
  }
  tr{
    border: 1px solid #c1c1c1;
  }
  td,th {

    padding: 0;
    width: 100px;
    height: 30px;
    text-align: center;
  }
  .brand-logo{
    height: 34px;
  }

</style>