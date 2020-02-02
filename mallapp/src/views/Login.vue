<template>
<div id="login">
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
          :model="formLogin"
          :rules="rules"
          ref="formLogin">
          <!-- $refs 只在组件渲染完成后才填充，并且它是非响应式的。它仅仅作为一个直接访问子组件的应急方案——应当避免在模版或计算属性中使用 $refs 。 -->
          <el-form-item label="账号" prop="name">
            <el-input v-model="formLogin.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formLogin.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword">
            <el-input v-model="formLogin.checkPassword" show-password></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="login">登录</el-button>
              <el-button @click="resetForm">取消</el-button>
          </el-form-item>
          <el-form-item>
            <router-link to="/register">
              <el-button type="">没有账号，立即注册<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </router-link>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
  </div>
</template>

<script type="text/javascript">
  // 引入vuex /src/helper.js中的辅助函数，
  // 将actions中的方法直接转为组件中的方法
 import NavBar from 'components/common/navbar/NavBar'
import {mapActions} from 'vuex'
import {checkuser,checkpass} from "network/login"

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
         }else if(value !== this.formLogin.password){
          return cb(new Error('两次输入密码不一致!'));
         }else{
          cb();
         }
      }
      return{
        formLogin:{
          name: '',
          password: '',
          checkPassword: ''
        },
          title:'登录',
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
      ...mapActions(['userLogin']),
      // 向登录接口发起请求
      login(){
        let user = this.formLogin;
        let formData = {
          username: user.name,
          password: user.password,
          token: "88888888"
        };
        if(!checkuser(formData)){
          if(checkpass(formData)){
              this.$message.success("登陆成功");
              this.userLogin(formData);
              // 登录成功 跳转至首页
              this.$router.push('/');
            }else{
              this.$message.error("密码错误！");
            }   
        }else{
          this.$message.error("该用户没有被注册！");
          return false;
        }
        // 表单验证
        // this.$refs['formLogin'].validate((valid) => {
        //   if (valid) {
        //     console.log(typeof(checkuser(formData)))
        //     if(!checkuser(formData)){
        //         this.$message.success("登陆成功")
        //         // 登录成功 跳转至首页
        //         this.$router.push('/');
        //     }else{
        //       this.$message.error("密码或用户名不正确");
        //       return false;
        //     }
        //     // 通过验证之后才请求登录接口
        //     // this.$http.post('/api/token/login',formData)
        //     //     .then(res => {
        //     //         console.dir(res.data)
        //     //         if (res.data.success) {
        //     //           this.userLogin(res.data);
        //     //           this.$message.success(`${res.data.message}`)
        //     //           // 登录成功 跳转至首页
        //     //           // this.$router.push({name:'Home'}) 
        //     //           this.$router.push('/') 
        //     //         }else{
        //     //           this.$message.error(`${res.data.message}`);
        //     //           return false;
        //     //         }
        //     //     })
        //     //     .catch(err => {
        //     //         this.$message.error(`${err.message}`, 'ERROR!')
        //     //     })
        //   } else {
        //     this.$message.error('表单验证失败!')
        //     return false;
        //   }
        // });
      },
      // 表单重置
      resetForm(){
        // console.log('表单重置')
        this.$refs['formLogin'].resetFields();
      }
    }
  }
</script>
<style scoped>
#login{
  padding: 2rem 0;
}
</style>