<template>
  <div class="isRealName" style="margin-top: 5px">
        <el-form ref="form" :model="form" label-width="80px" class="form-item" style="margin-top: 5px">
          <el-form-item>

            <el-input v-model="form.phone" style="width: 300px; margin-right: 70px; " ></el-input>
          </el-form-item>

          <el-form-item>
              <el-upload
                class="upload-demo"
                drag
                action="http://localhost:8083/user/realName/upload"
                name="picture"
                multiple
                limit=1
              :on-success="showLicense">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">请将本人驾照图片拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
<!--              <p>{{driverLicense.name}}</p>-->

            <el-dialog
              v-model="dialogFormVisible"
              :visible="dialogFormVisible"
              :append-to-body="true"
              @close="dialogFormVisible = false"
            >
              <table style="width: 80%" class="myTable">

                <tr>
                  <td class="column" style="vertical-align: middle; background-color: blanchedalmond">姓名</td>
                  <td class="column" style="vertical-align: middle;height: 50px">{{ driverLicense.name }}</td>
                </tr>
                <tr>
                  <td class="column" style="vertical-align: middle">身份证号</td>
                  <td class="column" style="vertical-align: middle; width: 500px; height: 50px">{{ driverLicense.num }}</td>
                </tr>
                <tr>
                  <td class="column" style="vertical-align: middle;height: 50px">准驾车型</td>
                  <td class="column" style="vertical-align: middle">{{driverLicense.vehicle_type}}</td>
                </tr>
              </table>


              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="isRealName">确认个人信息</el-button>
                </span>
              </template>
            </el-dialog>



          </el-form-item>
        </el-form>
  </div>
</template>

<script>
export default {
  name: "realName",
  data() {
    return {
      result:"",
      resultCode:"",
      msg:"",
      fileList: [],
      form: {
        userName:"",
        phone:"",
        num:"",
        userId:""
      },
      user:{},
      dialogFormVisible : false,
      driverLicense: {},
    }
  },
  methods: {
    isRealName(){
      this.user = JSON.parse(sessionStorage.getItem("user"));
      this.form.userName = this.driverLicense.name
      this.form.num = this.driverLicense.num
      this.form.userId = this.user.id;
      console.log(this.form.name)
      this.$userApi.post(false,'/user/realName/isRealName',this.form, res => {
        console.log(res)
        this.resultCode = res.data.code
        this.msg = res.data.message
        this.result = res.data.result
        if (this.result == null){
          this.$message({
            showClose: true,
            message: this.msg,
            type: 'error'
          });
          this.dialogFormVisible = false
        }else {
          this.user.isRealName = 1;
          sessionStorage.setItem("user", JSON.stringify(this.user))
          sessionStorage.setItem("isRealName","1");
          this.$message({
            message: '实名认证成功',
            type: 'success',
            duration: 6000
          });
          this.dialogFormVisible = false
          this.$router.push("/")
        }
      })
      // this.$userApi.get('/user/realName/isRealName/'+this.user.phone,null,res => {
      //   console.log(res)
      // })
    },
    showLicense(){
      this.$userApi.get("/user/realName/driver",null,res => {
        //console.log(res.data);
        this.driverLicense=res.data
        console.log(this.driverLicense)
      })
      if (this.driverLicense === null){
        this.dialogFormVisible = false
        this.$message({
          showClose: true,
          message: '驾驶证识别错误，请重新上传',
          type: 'error'
        });
      }else {
        this.dialogFormVisible = true
      }

    },
    onSubmit() {
      this.$userApi.get("/user/realName/isRealName",this.user.phone,res => {
        console.log(res)
      })
      console.log('submit!');
    }
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem("user"))
    this.form.phone = this.user.phone
  }
};
</script>

<style scoped>
.myTable {
  border-collapse: collapse;
  margin: 0 auto;
  text-align: center;
}

.myTable td,
.myTable th {
  text-align: center;
  border: 1px solid #cad9ea;
  color: #666;
  /*height: 60px;*/
}

  .isRealName{
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .realNameCard{
    height: 600px;
    width: 800px;

  }
  .form-item{
    margin-top: 20px;
  }
  .upload-demo{
    margin-right: 70px;
  }
</style>