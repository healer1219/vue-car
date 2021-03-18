<template>
    <div>
      <center>
      </center>
      <el-card class="myCard">
        <el-form label-width="80px" :model="form" ref="form" :rules="rules" status-icon class="myForm">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doSubmit('form')">登录</el-button>
            <el-button type="primary" @click="toRegister" plain>注册</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        form: {
          phone: '',
          password: ''
        },
        rules: {
          phone: [{
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      toRegister:function(){
        this.$router.push("/register")
      },
      doSubmit: function(formName) {
        this.$refs[formName].validate((valid)=>{
          if(valid){
            this.$userApi.post(false,'/login',this.form,response=>{
              console.log(response);
              if(response.data.code === 10000){
                var user = response.data.data;
                console.log(user);
                //登录成功后，将服务器返回过来的用户存到本地存储，localStorage，要存字符串，别存JSON对象
                //localStorage.setItem('user',JSON.stringify(user));
                sessionStorage.setItem('user',JSON.stringify(user));

                this.$message({
                  dangerouslyUseHTMLString:true,
                  message:'<h3>登录成功！</h3>',
                  type:'success'
                });

                //登录成功后，做跳转
                //window.open();
                this.$router.push({name:'Index'});

              }else{
                //alert('登录失败');
                this.$message({
                  dangerouslyUseHTMLString:true,
                  message:'<h3>登录失败！</h3>',
                  type:'error'
                });
              }
            });
          }else{
            return false;
          }
        });

      }
    }
  }
</script>

<style>
  .myCard {
    width: 450px;
    margin: 0 auto;
  }

  .myForm {
    margin: 20px;
  }
</style>
