<template>
  <div class="user-container" >



    <div class="user-info" v-if="isLogin">
      <img src="~@/assets/img/face.png" >
      <div class="meta">
        <h4 class="name">{{ user.username }}</h4>
        <span class="score">文明驾驶 0</span>
      </div>
    </div>
    <div class="user-info" v-else>
      <el-button type="primary" icon="el-icon-s-custom" round @click="toLogin">点击此处登录</el-button>
      <el-dialog class="my-el-dialog"
        v-model="dialogFormVisible"
        :visible="dialogFormVisible"
        :append-to-body="true"
        @close="closeInfo">
        <login />

      </el-dialog>
    </div>
    <ul class="group-links">
      <router-link to="aa" tag="a" class="arrow">
        <i class="icon icon-user-link-1"></i>
        我的账户
      </router-link>
      <router-link to="/order" tag="a" class="arrow">
        <i class="icon icon-user-link-2"></i>
        租车订单
      </router-link>
      <router-link to="realName" tag="a" class="arrow">
        <i class="icon icon-user-link-3"></i>
        实名认证
      </router-link>
      <router-link to="/safe" tag="a" class="arrow">
        <i class="icon icon-user-link-4"></i>
        安全设置
      </router-link>
      <router-link to="aa" tag="a" class="arrow">
        <i class="icon icon-user-link-5"></i>
        帮助中心
      </router-link>
    </ul>
    <button class="logout">退出</button>
  </div>
</template>

<script>
import Login from "../../components/login/login";
export default {
  components: {
    Login
  },
  data () {
    return {
      isLogin:false,
      dialogFormVisible: false,
      phone:"",
      password:"",
      user:{},
    }
  },
  methods: {
    toLogin(){
      this.dialogFormVisible = true;
    },
    getUser(){
      this.user = JSON.parse(sessionStorage.getItem("user"));
      console.log(this.user)
    },
  },
  mounted() {
    if (sessionStorage.getItem("user")){
      this.getUser();
      this.isLogin=true;
    }
  },
  http: {
  }
}
</script>

<style lang="scss" scoped>
.my-el-dialog{
  margin-left: auto;
  margin-right: auto;
  width: 1000px;
}
.user-info {
  display: flex;
  padding: 84px 0 80px 10px;
  img {
    width: 80px;
    height: 80px;
    border: 6px solid #2f343a;
    border-radius: 100%;
  }
  .name {
    color: #909090;
    font-size: 18px;
    line-height: 43px;
  }
  .score {
    display: inline-block;
    height: 27px;
    background: #10a0f2;
    border-radius: 100px;
    line-height: 27px;
    padding: 0 17px;
    color: #fff;
    font-size: 14px;
  }
}
.group-links {
  a {
    position: relative;
    display: block;
    margin: 0 -30px;
    padding: 0 30px;
    height: 64px;
    line-height: 64px;
    color: rgba(255, 255, 255, .4);
    font-size: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, .3)
  }
  .icon {
    width: 30px;
    height: 30px;
    margin: 0 16px -10px 0px;
  }
}
.logout {
  position: absolute;
  left: 50%;
  margin-left: -82px;
  bottom: 60px;
  width: 165px;
  height: 58px;
  background-color: #2d3339;
  border-radius: 100px;
  text-align: center;
  line-height: 58px;
  color: #fff;
  font-size: 18px;
  outline: none;
  border: none;
  cursor: pointer;
}
.arrow:after {
  position: absolute;
  right: 30px;
  top: 50%;
  margin-top: -5px;
  content: "";
  width: 10px;
  height: 10px;
  display: inline-block;
  border-top: 1px solid rgba(255, 255, 255, .4);
  border-right: 1px solid rgba(255, 255, 255, .4);
  @include webkit(box-sizing, border-box);
  @include webkit(transform, rotate(45deg));
}
</style>