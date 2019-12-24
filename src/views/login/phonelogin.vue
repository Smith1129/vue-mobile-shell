<!--  -->
<template>
   <div class="login_box">
		<div class="userbox">
			<div class="title">手机号验证码登录</div>
			<form action=""  onsubmit="return false">
				<div class="login_info_username">
					<span class="common_span">手机号</span>
					<input placeholder="请输入手机号" v-model="phone" />
				</div>
            <div class="login_info_pass">
                <span class="common_span">验证码</span>
				<input  placeholder="请输入验证码" v-model="code" />
            <van-button :disabled="disabled"  type="info" @click="getcode" class="getcode" :loading="codeLoading" :loading-text="codeLoadingText" size="small">
               {{codeLabel}}
            </van-button>
               <!-- <span class="getcode" @click="getcode()">获取验证码</span> -->
            </div>
            <div class="forget" @click="message">收不到验证码</div>
            <van-button round  type="info" @click="handleSubmit" class="login_button" :loading="loading" :loading-text="loadText">
               立即登录
               <div class="login_worry" v-if="errorMsg">账号或密码错误</div>
            </van-button>
            <div class="code_login" @click="goRouter()">用密码登录</div>
			</form>
         <div class="login_rule">登录即同意 《跳跳猪用户协议》 首次登录将自动注册</div>
		</div>
      <slide-block v-if="check" 
		:username="phone" 
		:pass="code" 
		@success="verifySuc"
		:name="'login_phone'"
		></slide-block>
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
import slideBlock from '../../components/slideblock/index'
   export default {
      //import引入的组件需要注入到对象中才能使用
      components: {slideBlock},
      data() {
      //这里存放数据
         return {
            show:false,
            check:false,
            passShow:true,
            loading:false,
            loadText:'登录中',
            codeLoading:false,
            codeLoadingText:'获取中',
            disabled:false,
            timer:null,
            phone:'',
            code:'',
            codeLabel:'获取验证码'
         };
      },
      //方法集合
      methods: {
         message(){
            this.show = true
         },
         getcode(){
            if(this.usernameCheck){
               this.codeLoading = true
               let payload = {Cellphone:this.phone,ApiCode:'User:quickLogin'}
               this.$api.user.getCode(payload).then((res)=>{
                  this.codeLoading = false
                  if(res.Code == 200){
                     this.disabled = true
                     let count = 10
                     this.timer = setInterval(()=>{
                        if(count >= 1){
                           count --
                           this.codeLabel = `${count} s`
                        }else{
                           this.disabled = false
                           this.codeLabel = '获取验证码'
                           clearInterval(this.timer)
                        }
                     },1000)
                  }
               })
            }else{
               this.$toast.fail('请填写正确手机号');
            }
         },
         handleSubmit(){
            if(this.usernameCheck && this.code){
               this.check = true
            }else{
               this.$toast.fail('手机号和验证码不能为空');
            }
		   },
         goRouter(){
            this.$router.push('/login')
         },
         verifySuc(){
            this.check = false
         }
      },
      //监听属性 类似于data概念
      computed: {
         usernameCheck(){
            let pattern = /^1[34578]\d{9}$/;
            let result = pattern.test(this.phone)
            return result
         },
         loadingStatus(){
			   return this.$store.state.user.loadingStatus_phone
         },
         errorMsg(){
			   return this.$store.state.user.errorMsg_phone
		   },
      },
      //监控data中的数据变化
      watch: {
         loadingStatus(val){
            if(val){
                  this.loading = true
            }else{
                  this.loading = false
            }
         }
      },
      //生命周期 - 创建完成（可以访问当前this实例）
      created() {
         this.$store.commit('user/setErrorMsg_phone','')
      },
      //生命周期 - 挂载完成（可以访问DOM元素）
      mounted() {
         
      },
   }
</script>
<style lang='scss' scoped>
  @import '../../assets/css/login/login';
</style>