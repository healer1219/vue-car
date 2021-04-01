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
          </div>
        </div>
        <img :src="carInfo.image" alt="">
      </div>
      <footer>
        <p class="parking-lot">{{order.createTime}}</p>
      </footer>
    </section>
    <section  v-else class="car-brand">
      <header>
        <h3 class="cars-attr">没有正在进行中的订单哦! &nbsp;</h3>
        <p class="cars-attr">快去选车吧！</p>
      </header>

    </section>

    <el-scrollbar>
      <section v-for="(order, index) in orderList" class="car-item" style="margin-top: 5px;">
      <header>
        <h4 class="cars-logo">
          <img :src="brand.img" :alt="carInfo.name" style="height: 45px">
          <span class="cars-name">{{ carInfo.name }}</span>
        </h4>
        <p class="cars-attr">历史订单</p>
      </header>
      <div class="car-content">
        <div class="info">
          <div>
            <h4 class="car-number">{{ item.num }}</h4>
          </div>
        </div>
        <img :src="carInfo.image" alt="">
      </div>
      <footer>
        <p class="parking-lot">{{order.createTime}}</p>
      </footer>
    </section>
    </el-scrollbar>>


  </div>
</template>
<script>
export default {
  name: "order",
  data(){
    return {
      // 所有页面的数据
      totalPage: [],
      // 每页显示数量
      pageSize: 5,
      // 共几页
      pageNum: 1,
      // 当前显示的数据
      dataShow: "",
      // 默认当前显示第一页
      currentPage: 0,
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
      orderList:[],
      carInfo:{},
      item:{},
      brand:{},
      getOrder: true,
    }
  },
  methods: {
    loadMore: function() {
      this.busy = true
      setTimeout(() => {
        for (var i = 0, j = 10; i < j; i++) {
          this.orderList.push({name: i })
        }
        console.log(this.data)
        this.busy = false
      }, 1000)
    },

    getCarInfo(){
      this.$carApi.get('/brand/carInfo/', this.carList[0].id,res => {
        // this.dialogVisible = true
        console.log(res)
        this.infoList = res.data.data
        console.log(this.infoList)
      })
    },
  },
  mounted() {
    let user = JSON.parse(sessionStorage.getItem("user"));

    this.$orderApi.get("/order/all/"+user.id, null, res => {
      this.orderList = res.data.data
    })

    this.$carApi.get('/brand', null, response =>{
      console.log(response)
      this.carList = response.data.data
    })

    this.$orderApi.get("/order/userOrder/"+user.id, null, res => {
      console.log(res)
      if (res.data.code === 10001){
        this.getOrder = false;
      }
      this.order = res.data.data
      this.$itemApi.get("/item/"+this.order.itemId, null, res => {
        console.log(res)
        let item = res.data.data;
        this.item = item;
        this.$carApi.get('brand/carInfo/single/'+item.carId,null,(res) => {
          this.carInfo = res.data.data;
          console.log(res.data.data)
          let carInfo = res.data.data;
          this.$carApi.get('/brand/'+carInfo.brandId, null, response =>{
            console.log(response)
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
