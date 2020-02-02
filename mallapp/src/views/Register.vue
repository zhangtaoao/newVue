<template>
<div id="reg">
   <nav-bar>
           <div slot="left">
             <router-link to='/mine'> Back </router-link> 
           </div>
           <div slot="center">{{title}}</div>
          </nav-bar>
  <el-card class="box-card">
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-form
         label-position="left" 
         label-width="3rem" 
         :model="formRegister"
         :rules="rules"
         ref="formRegister">
          <el-form-item label="账号" prop="name">
            <el-input v-model="formRegister.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formRegister.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword">
            <el-input v-model="formRegister.checkPassword" show-password></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="addUser">立即注册</el-button>
              <el-button>取消</el-button>
            </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card></div>
</template>

<script type="text/javascript">
  import NavBar from 'components/common/navbar/NavBar'
  import {Registration,checkuser} from "network/login"

  export default {
    components:{
    NavBar
    },
    data(){
      let checkUserName = (rule,value,cb)=>{
        if(!value){
          return cb(new Error('账户不能为空!'))
        }else{
          cb(); // 将判断传递给后面
        }

      }
      let checkPassword = (rule,value,cb)=>{
        if(!value){
          return cb(new Error('密码不能为空!'))
         }else{
          cb();
         }
      }
      let checkPasswordAgain = (rule,value,cb)=>{
        if(!value){
          return cb(new Error('再次输入密码不能为空!'))
         }else if(value !== this.formRegister.password){
          return cb(new Error('两次输入密码不一致!'));
         }else{
          cb();
         }
      }

      return{
        formRegister:{
          name: '',
          password: '',
          checkPassword: ''
        },
        title:'注册',
        rules:{
          name:[
            {validator:checkUserName,trigger: 'blur'}
          ],
          password:[
            {validator:checkPassword,trigger: 'blur'}
          ],
          checkPassword:[
            {validator:checkPasswordAgain,trigger: 'blur'}
          ]
        }
      }
    },
    methods:{
      // 增加单条电影
      addUser(){
        let user = this.formRegister;
        let formData = {
          username: user.name,
          password: user.password,
          token:'88888888'
        };
        if(checkuser(formData)){
              Registration(formData);
              this.$message.success("注册成功，请登陆");
              this.$router.push('/login');
        }else{
          this.$message.error("用户名重复");
        }
        // 表单验证
        // this.$refs['formRegister'].validate((valid)=>{
        //   if(valid){
        //     // this.$http.post('/api/token/register',formData)
        //     // .then(res => {
        //     //   console.dir(res.data)
        //     //   if (res.data.message) {
        //     //     this.$message.error(res.data.message);
        //     //     return false;
        //     //   }else{
        //     //     this.$router.push('/login')
        //     //   }
        //     // })
        //     // .catch(err => {
        //     //     this.$message.error(`${err.message}`)
        //     // })
        //   }else{
        //     this.$message.error('表单验证失败!')
        //     return false;
        //   }
        // })
      }
    }
  }
</script>

<style scoped>
#reg{
  padding: 2rem 0;
}
</style>