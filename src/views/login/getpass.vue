<!--  -->
<template>
   <div class="login_box">
		<div class="userbox">
			<div class="title">找回登录密码</div>
			<form action="" onsubmit="return false">
				<div class="login_info_username">
					<span class="common_span">手机号</span>
					<input placeholder="请输入手机号" v-model="phoneNum" />
				</div>
            <div class="login_info_pass">
               <span class="common_span">验证码</span>
				<input placeholder="请输入验证码" v-model="code"/>
            <!-- <van-button :disabled="!codeBtn" type="info" @click="getcode" class="getcode" :loading="codeLoading" :loading-text="codeLoadingText" size="small">
               获取验证码
            </van-button> -->
            <van-button :disabled="!codeBtn" type="info" @click="getcode" class="getcode" size="small">
               {{codeText}}
            </van-button>
               <!-- <span class="getcode">获取验证码</span> -->
            </div>
            <div class="forget" @click="message">收不到验证码</div>
            <!-- <div class="login_button" @click="goRouter">下一步
               <div class="login_worry">密码或账号错误</div>
            </div> -->
            <van-button round  type="info" @click="handleSubmit" class="login_button" :loading="loading" :loading-text="loadText">
               下一步
               <div class="login_worry" v-if="false">密码或账号错误</div>
            </van-button>  
			</form>
         <div class="login_rule">登录即同意 《跳跳猪用户协议》 首次登录将自动注册</div>
		</div>
      <van-dialog
         v-model="show"
         title="收不到验证码？"
         :show-cancel-button='false'
         >
            <!-- <p>收不到验证码？</p> -->
         <ul>
            <li>1.请检查是否输入正确的手机号码</li>
            <li>2.检查手机是否停机</li>
            <li>3.请联系官方客服</li>
         </ul>
      </van-dialog>
	</div>
</template>

<script>
   //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
   //例如：import 《组件名称》 from '《组件路径》';

   export default {
      //import引入的组件需要注入到对象中才能使用
      components: {},
      data() {
      //这里存放数据
         return {
            show:false,
            passShow:true,
            loading:false,
            loadText:'',
            // codeLoading:false,
            // codeLoadingText:'',
            phoneNum:'',
            code:'',
            codeBtn:true,
            codeTime:10,
            codeText:'获取验证码'
         };
      },
      //方法集合
      methods: {
         message(){
            this.show = true
         },
         goRouter(){
            this.$router.push('/login/setpass')
         },
         getcode(){
            if(this.phoneCheck && this.codeBtn){
               // this.phoneCheck && this.codeBtn
               let payload = {
                  Cellphone:this.phoneNum,
                  ApiCode:'User:forgetPassword',
               }
               this.$api.user.getCode(payload).then((res)=>{
                  if(res.Code === 200){
                     this.codeBtn = false
                      let timer = setInterval(()=>{
                           if(this.codeTime>0){
                              this.codeTime--
                              this.codeText = `重发 ${this.codeTime}s`
                              this.codeBtn = false
                           }else{
                              clearInterval(timer)
                              this.codeBtn = true
                              this.codeTime = 10
                              this.codeText = `获取验证码`
                           }
                        },1000)
                  }else{
                     this.codeBtn = true
                     this.$toast.fail(res.Msg);
                     // alert(res.Msg)
                  }
               })
            }else{
               // alert('手机号错误！！！')
               this.$toast.fail('手机号错误');
            }
         },
         handleSubmit(){
            if(this.phoneCheck && this.code){
               this.loading = true
               this.loadText = '修改中'
               let payload = {
                  Cellphone:this.phoneNum,
                  ApiCode: 'User:forgetPassword',
                  VerifyCode: this.code,
                  // Password:'',
                  Step:1
               }
               this.$api.user.getPass(payload).then((res)=>{
                  this.loading = false
                  if(res.Code === 200){
                     payload.Step = 2
                     this.$store.commit('user/setPassInfo',payload)
                     this.$router.push('/login/setpass')
                  }else{
                     this.$toast.fail(res.Msg);
                  }
               })
            }else{
               this.$toast.fail('请输入手机号和验证码');
               // alert('请输入手机号和验证码！！！')
            }
		   },
      },
      //监听属性 类似于data概念
      computed: {
         phoneCheck(){
            let pattern = /^1[34578]\d{9}$/;
            let result = pattern.test(this.phoneNum)
            return result
         }
      },
      //监控data中的数据变化
      watch: {},
      //生命周期 - 创建完成（可以访问当前this实例）
      created() {
         
      },
      //生命周期 - 挂载完成（可以访问DOM元素）
      mounted() {
         
      },
   }
</script>
<style lang='scss' scoped>
    @import '../../assets/css/login/login';
</style>