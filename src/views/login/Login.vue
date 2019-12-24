<!-- login -->
<template>
	<div class="login_box">
		<div class="userbox">
			<div class="title">账号密码登录</div>
			<form action="" onsubmit="return false">
				<div class="login_info_username">
					<span class="common_span">账号</span>
					<input placeholder="请输入账号" v-model="username" />
				</div>
            <div class="login_info_pass">
               <span class="common_span">密码</span>
					<input :type="passShow?'password':'text'" placeholder="请输入密码" v-model="pass" />
               <em @click="getPass"></em>
            </div>
            <div class="forget" @click="goRouter(1)">忘记密码</div>
			<van-button round  type="info" @click="handleSubmit" class="login_button"
			:loading="loading" :loading-text="loadingText"
			>
				立即登录
				<div class="login_worry" v-if="errorMsg">账号或密码错误</div>
			</van-button>
            <div class="code_login" @click="goRouter(2)">验证码登录</div>
			
			</form>
         <div class="login_rule">登录即同意 《跳跳猪用户协议》 首次登录将自动注册</div>
		</div>
		<slide-block v-if="check" 
		:username="username" 
		:pass="pass" 
		@success="verifySuc"
		:name="'login'"
		></slide-block>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import slideBlock from '../../components/slideblock/index'
export default {
	name: 'login',
	//import引入的组件需要注入到对象中才能使用
	components: {
		slideBlock
	},
	data() {
		//这里存放数据
		return {
			loading:false,
			loadingText:'登录中',
			tip:false,
			passShow:true,
			username:'',
			pass:'',
			check:false
		};
	},
	//方法集合
	methods: {
		handleSubmit(){
			if(this.pass && this.username){
				this.check = true
			}else{
				this.$toast.fail('账号密码不能为空');
			}
		},
		getPass(){
			this.passShow = !this.passShow
		},
		goRouter(index)
		{
			if(index===1){
				this.$router.push('login/getpass')
			}else if(index===2){
				this.$router.push('login/phone')
			}
		},
		verifySuc(){
			this.check = false
		}
	},
	//监听属性 类似于data概念
	computed: {
		errorMsg(){
			return this.$store.state.user.errorMsg
		},
		loadingStatus(){
			return this.$store.state.user.loadingStatus
		}
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
		this.$store.commit('user/setLoginError','')
	},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {}
};
</script>
<style lang='scss' scoped>
  @import '../../assets/css/login/login';
</style>