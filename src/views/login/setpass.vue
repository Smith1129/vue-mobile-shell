<!--  -->
<template>
    <div class="login_box">
		<div class="userbox">
			<div class="title">重新设置密码</div>
			<form action="" onsubmit="return false">
				<div class="set_pass">
					<p>为您的账号设置一个新的密码</p>
					<p></p>
				</div>
            <div class="login_info_pass set_pass_info">
               <span class="common_span">新密码</span>
               <input type="password" v-model="newPass">
               <em></em>
            </div>
            <!-- <div class="login_button new_pass" @click="save">保存新密码
               <div class="login_worry">密码或账号错误</div>
            </div> -->
             <van-button round  type="info" @click="save" class="login_button new_pass" :loading="loading" :loading-text="loadText">
               保存新密码
               <div class="login_worry" v-if="false">密码或账号错误</div>
            </van-button>
			</form>
         <div class="login_rule login_rule_set">登录即同意 《跳跳猪用户协议》 首次登录将自动注册</div>
		</div>
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
            show:true,
            loading:false,
            loadText:'保存中',
            newPass:''
         };
      },
      //方法集合
      methods: {
         save(){
            if(this.newPass){
               let params = {...this.payload,Password:this.newPass}
               this.loading = true
               this.$api.user.getPass(params).then((res)=>{
                  this.loading  = false
                     if(res.Code === 200){
                        this.$toast.success('设置成功');
                     }else{
                        this.$toast.fail(res.Msg);
                     }
               })
            }else{
               this.$toast.fail('请输入新密码');
            }
         }
      },
      //监听属性 类似于data概念
      computed: {
         payload(){
            console.log(this.$store.state.user.passPayload)
            return this.$store.state.user.passPayload;
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