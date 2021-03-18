<template>
  <div class="user-container">
    <Back colum="安全设置"></Back>
    <ul class="group-links">
      <router-link to="/password" tag="a" class="arrow">
        修改登录密码
      </router-link>
      <router-link to="aa" tag="a">
        设置资金密码
      </router-link>
      <router-link to="aa" tag="a">
        绑定手机号
      </router-link>
      <router-link to="/safe" tag="a">
        绑定银行号
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {}
    }
  }
</script>

<style lang="scss" scoped>
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