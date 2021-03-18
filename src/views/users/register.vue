<template>
  <div class="password-form-wrap">
    <Back colum="修改登录密码"></Back>
    <div class="cars-form-ui">
      <el-form :model="newUser" status-icon :rules="rules" ref="newUser" class="demo-ruleForm">
        <el-form-item>
          <el-input v-model="newUser.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item  prop="pass">
          <el-input type="password" v-model="newUser.password" autocomplete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="newUser.checkPass" autocomplete="off"  placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="newUser.email" placeholder="邮箱地址"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="newUser.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="button-password">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.newUser.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.newUser.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      newUser: {
        username: '',
        password: '',
        checkPass:'',
        email: '',
        phone: '',
        age:''
      },
      user:{
        username: '',
        password: '',
        email: '',
        phone: '',
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onSubmit() {
      this.user.username = this.newUser.username;
      this.user.password = this.newUser.password;
      this.user.email = this.newUser.email;
      this.user.phone = this.newUser.phone;
      console.log('submit!');
      this.$userApi.post(true,"/user/register",this.user,res => {
        console.log(res);
        if(res.data.code === 10000){
          var user = res.data.data;
          console.log(user);
          //登录成功后，将服务器返回过来的用户存到本地存储，localStorage，要存字符串，别存JSON对象
          //localStorage.setItem('user',JSON.stringify(user));
          sessionStorage.setItem('user',JSON.stringify(user));

          this.$message({
            dangerouslyUseHTMLString:true,
            message:'<h3>注册成功！请登录</h3>',
            type:'success'
          });

          //登录成功后，做跳转
          //window.open();
          this.$router.push({name:'Index'});

        }else if (res.data.code === 10004){
          //alert('登录失败');
          this.$message({
            dangerouslyUseHTMLString:true,
            message:'<h3>此手机号已被注册</h3>',
            type:'error'
          });
        }
      })


    },
  }
};
</script>

<style lang="scss" scoped>
.password-form-wrap {
  padding: 0 30px;
}
</style>