<!--  -->
<template>
	<div class="about">
		<button @click="handleClick" :class="clsName">获取列表</button>
		<h1 v-fColor="'red'">{{aboutName}}```````{{clsName}}``````````{{address}}</h1>
		<h1>{{1572334780|forTime}}</h1>
		<span>
			<p>dddddddsss</p>
		</span>
		<input type="text" v-model="tel_registered" placeholder="phone" v-autoFocus />
		{{phoneNumVerify}}
		<img ref="captcha" @click="getCaptcha" />
		<div class="box" v-for="(item,index) in 3" :key="item+index">
			<span class="img"></span>
			<span class="text">
				<em>Holy Grail Layout</em>
				<p>
					Holy Grail LayoutHoly Grail LayoutHoly Grail LayoutHoly Grail Layout
					Holy Grail LayoutHoly Grail LayoutHoly Grail LayoutHoly Grail Layout
				</p>
			</span>
		</div>
		<div class="free"></div>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
	name: 'abouts',
	//import引入的组件需要注入到对象中才能使用
	components: {},
	data() {
		//这里存放数据
		return {
			IsIndex: 2,
			tel_registered: ''
		};
	},
	//方法集合
	methods: {
		getCaptcha() {
			let captchaEle = this.$refs.captcha;
			this.$set(
				captchaEle,
				'src',
				'http://www.juxiangyou.com/verify?time=' +
					Date.parse(new Date()) / 1000
			);
		},
		handleClick() {
			this.$store.dispatch('getName');
			// this.$store.dispatch('getAddress');
			this.$api.article.articleList().then(res => {
				// 执行某些操作
				if (res.Code == 200) {
					console.log(res.Data, 'res');
				} else {
					console.log('请求失败');
				}
			});
		}
	},
	//监听属性 类似于data概念
	computed: {
		//验证手机号
		phoneNumVerify() {
			return /[1][3,4,5,6,7,8][0-9]{9}$/.test(this.tel_registered);
		},
		// 个人中心NAME
		aboutName() {
			return this.$store.state.about.name;
		},
		// 个人中心地址
		address() {
			return this.$store.state.about.address;
		},
		// 获取列表className
		clsName() {
			let cls = '';
			switch (this.IsIndex) {
				case 1:
					cls = 'aa';
					break;
				case 2:
					cls = 'bb';
					break;
				case 3:
					cls = 'cc';
					break;
				default:
					cls = 'dd';
					break;
			}
			return cls;
		}
	},
	//监控data中的数据变化
	watch: {},
	//生命周期 - 创建完成（可以访问当前this实例）
	created() {},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {
		this.getCaptcha();
	}
};
</script>
<style lang="scss" scoped>
@import '../../assets/css/about/index';
</style>