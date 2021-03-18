<template>
  <div class="header-back">
    <div class="back">
      <i class="icon"></i>
      <h4 class="title">{{colum}}</h4>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Back",
    props: {
      colum: {
        type: String,
        default: ""
      }
    }
  }
</script>
<style lang="scss" scoped>
  .header-back {
    height: 147px;
    position: relative;
  }
  .back {
    height: 41px;
    position: absolute;
    top: 21px;
    left: 0;
    right: 0;
  }
  .title {
    font-size: 16px;
    line-height: 40px;
    color: #fff;
    margin-left: 33px;
  }
  .icon {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    &:after {
      content: "";
      width: 12px;
      height: 12px;
      display: inline-block;
      position: absolute;
      top: 14px;
      left: 0;
      border-left: 2px solid #00a3ff;
      border-top: 2px solid #00a3ff;
      @include webkit(box-sizing, border-box);
      @include webkit(transform, rotate(-45deg));
    }
  }
</style>