<template>
  <div class="navbar">
    <ul>
      <li><i class="icon icon-w-44 icon-qm"></i></li>
      <li>
        <el-popover
        placement="bottom"
        width="300"
        trigger="click"
        >
          <el-button class="icon icon-w-44 icon-daohanglansousuo" slot="reference"></el-button>

          <el-form >
            <el-form-item>
              <el-input v-model="search" @keyup.enter.native="goSearch"></el-input>
            </el-form-item>
          </el-form>
        </el-popover>
        </li>
      <li><i class="car-select-btn" @click="toItem">立即租车</i></li>
      <li><i class="icon icon-w-44 icon-daohang"></i></li>
      <li><i class="icon icon-w-44 icon-daohanggerenzhongxin" @click="toUser"></i></li>
    </ul>

  </div>
</template>
<script>
  import router from "@/router";

  export default {
    name: "carBar",
    data(){
      return{
        user: {},
        search: "输入您想搜索的车型",
      }

    },
    methods: {
      goSearch(){
        console.log("ssssss");
        if (this.search === "输入您想搜索的车型"){
            this.$message({
              dangerouslyUseHTMLString:true,
              message:'<h3>请输入您想要找的车型哦</h3>',
              type:'error'
            });
        }else {
          this.$carApi.get("/brand/carInfo/like?carName="+this.search, null, res => {
            console.log(res.data.code)
            if (res.data.code === 10001){
              this.$message({
                dangerouslyUseHTMLString:true,
                message:'<h3>没有您您想要车型哦，再看看吧</h3>',
                type:'error'
              });
            }else {
              let searchCar = res.data.data
              router.push("/item/"+searchCar.id)
              location.reload()

            }

          })
        }

      },
      toUser() {
        this.$router.push({
          name: "User"
        })
      },
      toItem() {
        this.user = JSON.parse(sessionStorage.getItem("user"));
        if (this.user === null){
          this.$message({
            dangerouslyUseHTMLString:true,
            message:'<h3>您还未登录，请登陆后操作</h3>',
            type:'error'
          });
            this.$router.push("user")
        }
        if (this.user.isRealName === 0){
          this.$message({
            dangerouslyUseHTMLString:true,
            message:'<h3>此账号未进行实名认证，即将跳转至实名认证界面</h3>',
            type:'error'
          });
          setTimeout(()=>{
            this.$router.push({
              name:"realName"
            })
          }, 3000)

        }else {
          this.$router.push({
            name: "carItem"
          })
        }
      },
    }
  }
</script>
<style lang="scss" scoped>
  .navbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 80px;
    z-index: 10;
    text-align: center;
    li {
      display: inline-block;
    }
    .icon {
      vertical-align: middle;
      margin: 0 17px;
      cursor: pointer;
      border-radius: 100px;
      background-color: $color-main;
    }
    .rental-button{
      background-color:#34393f;
      color: aliceblue;
    }
    .car-list{
      color: #ffffff;

    }
  }
</style>