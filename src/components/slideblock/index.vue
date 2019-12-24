<!--  -->
<template>
	<div class="allcontent">
		<div class="code">
			<div class="code_title">
				<span>请先完成安全验证</span>
				<span @click="cancel"></span>
			</div>
			<!-- 拼图 -->
			<div class="code_puzzle">
				<div class="puzzle_holder">
					<div class="puzzle_bgimg" v-if="verifyBgInfo">
						<img :src="`http://captcha.ttz.com/${verifyBgInfo.wall}`" class="bgimg_bg" />
						<img
							:src="`http://captcha.ttz.com/${verifyBgInfo.piece}`"
							class="bgimg_saw"
							ref="saw"
							:style="{top:`${verifyBgInfo.offsetY/scree}px`}"
						/>
					</div>
					<div class="puzzle_top">
						<div class="puzzle_refresh" @click="refesh"></div>
					</div>
				</div>
			</div>
			<!-- 拖动 -->
			<div class="code_touch">
				<div class="code_touchTxt">
					<div class="indicator" ref="indicator" :class="toucheState"></div>
					<div
						ref="slideBtn"
						class="btn"
						@touchstart.stop="movestart"
						v-if="toucheState!='success'"
						@touchmove.stop="rangeMove($event,1)"
						@touchend.stop="rangeMove($event,2)"
						@mousedown.stop="rangeMove_pc"
					>
						<!-- <span ref="sliderIcon"></span> -->
					</div>
					<span class="txt" :class="toucheState">{{infoTxt}}</span>
				</div>
			</div>
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
			disX: 0,
			rangeStatus: false, //拖拽状态
			infoTxt: '向右拖动滑块填充拼图', //提示文字
			toucheState: 'normal', //验证状态 ,
			text: 100,
			count: 0,
			startX: 0,
			key: '',
			timer: null,
			offsetX:0
		};
	},
	props: ['username', 'pass', 'name'],
	//方法集合
	methods: {
		movestart(e) {
			this.startX = e.touches[0].clientX;
		},
		cancel() {
			this.$emit('success');
		},
		//滑块移动--- 移动端
		rangeMove(e, index) {
			let ele = e.target;
			let clientX = e.changedTouches[0].clientX;
			let startX = this.startX;
			let eleWidth = ele.offsetWidth;
			let parentWidth = ele.parentElement.offsetWidth;
			let MaxX = parentWidth - eleWidth;
			let swg = this.$refs.saw;
			let indicator = this.$refs.indicator;
			this.infoTxt = '';
			this.toucheState = 'normal';
			let scrennWidth = 375 / document.body.clientWidth;
			if (this.rangeStatus) {
				//不运行
				return false;
			}
			if (index === 1) {
				let endX = clientX;
				this.disX = endX - startX;
				if (this.disX <= 0) {
					this.disX = 0;
				}
				if (this.disX >= MaxX) {
					//减去滑块的宽度,体验效果更好
					this.disX = MaxX;
				}
				let isLeft =
					this.disX > 265 / scrennWidth
						? 265 / scrennWidth
						: this.disX;
				ele.style.transition = 'none';
				ele.style.transform = 'translateX(' + this.disX + 'px)';
				swg.style.transition = 'none';
				swg.style.transform = 'translateX(' + isLeft + 'px)';
				indicator.style.transition = 'none';
				indicator.style.width = this.disX + 40 + 'px';
			} else if (index === 2) {
				this.offsetX = scrennWidth * this.disX;
				const payload = {
					key: this.verifyBgInfo.key,
					offsetX: parseInt(this.disX * scrennWidth)
				};
				this.$api.user.getVerify(payload).then(res => {
					if (res.Data.success == 1) {
						let params = {
							jwtToken: this.videoToken
						};
						this.toucheState = 'success';
						this.infoTxt = '验证成功';
						indicator.style.width = 100 + '%';
						this.checkInfo()
					} else {
						this.rangeStatus = true;
						ele.style.transition = '.5s all';
						ele.style.transform = 'translateX(0)';
						swg.style.transition = '.5s all';
						swg.style.transform = 'translateX(0)';
						indicator.style.transition = '.5s all';
						indicator.style.transform = 'translateX(0)';
						indicator.style.width = 0 + 'px';
						//执行失败的函数
						this.infoTxt = '验证失败';
						this.toucheState = 'error';
						setTimeout(() => {
							this.refesh();
						}, 600);
					}
				});
			}
		},
		//移动滑块pc端
		rangeMove_pc(e) {
			let ele = e.target;
			let startX = e.clientX;
			let eleWidth = ele.offsetWidth;
			let parentWidth = ele.parentElement.offsetWidth;
			let MaxX = parentWidth - eleWidth;
			let swg = this.$refs.saw;
			let indicator = this.$refs.indicator;
			this.infoTxt = '';
			this.toucheState = 'normal';
			let scrennWidth = 375 / document.body.clientWidth;
			if (this.rangeStatus) {
				//不运行
				return false;
			}
			document.onmousemove = e => {
				let endX = e.clientX;
				this.disX = endX - startX;
				if (this.disX <= 0) {
					this.disX = 0;
				}
				if (this.disX >= MaxX) {
					//减去滑块的宽度,体验效果更好
					this.disX = MaxX;
				}
				let isLeft = this.disX > 265 / scrennWidth ? 265 / scrennWidth : this.disX;
				ele.style.transition = 'none';
				ele.style.transform = 'translateX(' + this.disX + 'px)';
				swg.style.transition = 'none';
				swg.style.transform = 'translateX(' + isLeft + 'px)';
				indicator.style.transition = 'none';
				indicator.style.width = this.disX + 40 + 'px';
				e.preventDefault();
			};
			document.onmouseup = () => {
				this.text = scrennWidth * this.disX;
				const payload = {
					key: this.verifyBgInfo.key,
					offsetX: parseInt(this.disX * scrennWidth)
				};
				this.$api.user.getVerify(payload).then(res => {
					if (res.Data.success == 1) {
						let params = {
							jwtToken: this.videoToken
						};
						this.toucheState = 'success';
						this.infoTxt = '验证成功';
						indicator.style.width = 100 + '%';
						this.checkInfo()
					} else {
						this.rangeStatus = true;
						ele.style.transition = '.5s all';
						ele.style.transform = 'translateX(0)';
						swg.style.transition = '.5s all';
						swg.style.transform = 'translateX(0)';
						indicator.style.transition = '.5s all';
						indicator.style.transform = 'translateX(0)';
						indicator.style.width = 0 + 'px';
						//执行失败的函数
						this.infoTxt = '验证失败';
						this.toucheState = 'error';
						setTimeout(() => {
							this.refesh();
						}, 600);
					}
				});
				document.onmousemove = null;
				document.onmouseup = null;
			};
		},
		//用户信息校验
		checkInfo() {
			if (this.name == 'login') {
				let payload = {
					Username: this.username,
					Password: this.pass,
					key: this.key,
					offsetX:parseInt(this.offsetX)
				};
				//设置登陆转动状态
				this.$store.commit('user/setLoadingStatus', true);
				this.$store.dispatch('user/getLogin', payload);
			} else if (this.name == 'login_phone') {
				let payload = {
					Cellphone: this.username,
					ApiCode: 'User:quickLogin',
					VerifyCode: this.pass
				};
				this.$store.commit('user/setLoadingStatus_phone', true);
				this.$store.dispatch('user/getPhoneLogin', payload);
			}
			this.timer = setTimeout(() => {
				this.$emit('success');
			}, 600);
		},
		// 刷新
		refesh() {
			this.rangeStatus = false;
			let indicator = this.$refs.indicator;
			let swg = this.$refs.saw;
			this.infoTxt = '向右拖动滑块填充拼图';
			this.toucheState = 'normal';
			this.disX = 0;
			swg.style.transition = 'none';
			swg.style.transform = 'translateX(' + this.disX + 'px)';
			indicator.style.transition = 'none';
			indicator.style.width = this.disX + '%';
			this.getData();
		},
		//获取拼图数据
		getData() {
			let _this = this;
			let payload = {
				success: res => {
					_this.key = res;
					console.log(_this.key);
				}
			};
			this.$store.dispatch('user/getVerifyPic', payload);
		}
	},
	//监听属性 类似于data概念
	computed: {
		verifyBgInfo() {
			return this.$store.state.user.verifyPicInfo;
		},
		scree() {
			let scrennWidth = 375 / document.body.clientWidth;
			return scrennWidth;
		}
	},
	//监控data中的数据变化
	watch: {},
	//生命周期 - 创建完成（可以访问当前this实例）
	created() {
		this.getData();
	},
	beforeDestroy() {
		clearTimeout(this.timer);
	},
	//生命周期 - 挂载完成（可以访问DOM元素）
	mounted() {}
};
</script>
<style lang='scss' scoped>
.allcontent {
	background: rgba(000, 000, 000, 0.6);
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	.code {
		width: 320px;
		// height: 225px;
		height: 250px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		// margin-left: -160px;
		// margin-top: -117.5px;
		border: 1px solid #e6e8eb;
		background: #fff;
		padding: 0 9px;
		box-sizing: border-box;
		.code_title {
			width: 100%;
			height: 40px;
			line-height: 40px;
			position: relative;
			span:nth-child(1) {
				display: inline-block;
				color: #45494c;
				// height: 50px;
				font-size: 16px;
			}
			span:nth-child(2) {
				display: inline-block;
				width: 11PX;
				height: 11PX;
				position: absolute;
				right: 0;
				top: 13px;
				background: url('http://cstaticdun.126.net//2.13.2/images/icon_light.c72616a.png')
					no-repeat;
				background-position: 0 -53PX;
			}
		}
		.code_puzzle {
			height: 150px;
			padding-bottom: 6px;
			.puzzle_holder {
				pointer-events: auto;
				position: relative;
				padding-top: 50%;
				overflow: hidden;
				box-sizing: border-box;
				height: 100%;
				.puzzle_bgimg {
					pointer-events: auto;
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					.bgimg_bg {
						pointer-events: auto;
						vertical-align: top;
						width: 320px;
						height: 160px;
						border-radius: 2px;
					}
					.bgimg_saw {
						position: absolute;
						left: 0;
						top: 0;
						width: 55px;
						height: 57px;
						transform: translateZ(0);
						perspective: 1000;
						backface-visibility: hidden;
					}
				}
				.puzzle_top {
					position: absolute;
					right: 0;
					top: 0;
					max-width: 68px;
					.puzzle_refresh {
						float: right;
						width: 30px;
						height: 30px;
						margin-left: 4px;
						cursor: pointer;
						background-image: url(http://cstaticdun.126.net//2.12.1/images/icon_light.c72616a.png);
						background-position: 0 -299px;
						background-size: 32px 544px;
						&:hover {
							background-position: 0 -266px;
						}
					}
				}
			}
		}
		.code_touch {
			height: 40px;
			border-radius: 2px;
			line-height: 40px;
			color: #45494c;
			border: 1px solid #e4e7eb;
			background-color: #f7f9fa;
			font-size: 14px;
			.code_touchTxt {
				height: 40px;
				position: relative;
				text-align: center;
				.indicator {
					height: 40px;
					border-radius: 2px;
					width: 0;
					border: 1px solid transparent;
					position: absolute;
					top: -1px;
					left: -1px;
					&.normal {
						background: #d1e9fe;
					}
					&.error {
						background: #fce1e1;
					}
					&.success {
						background: #d2f4ef;
					}
				}
				.btn {
					position: absolute;
					top: 0;
					left: 0;
					height: 100%;
					background: url('../../assets/image/slideblock.png') 0/100%
						no-repeat;
					// box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
					cursor: pointer;
					transition: background 0.2s linear;
					width: 40px;
					// border-radius: 2px;
					span {
						position: absolute;
						top: 50%;
						margin-top: -6px;
						left: 50%;
						margin-left: -6px;
						width: 14px;
						height: 10px;
						background-image: url(http://cstaticdun.126.net//2.12.1/images/icon_light.c72616a.png);
						background-position: 0 -26px;
						background-size: 32px 544px;
					}
				}
				.txt {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					&.success {
						color: #52ccba;
					}
					&.error {
						color: #f57a7a;
					}
				}
			}
		}
	}
}
</style>