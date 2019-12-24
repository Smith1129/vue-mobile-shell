<!--  -->
<template>
   <div class='download_box'>
       <div class="download_content">
           <div class="pic_list">
                <div class="grid_item1"></div>
                <div class="grid_item2"></div>
                <div class="grid_item3">
                    <span></span>
                    <span>IOS下载安装</span>
                </div>
           </div>
           <div class="type_list">
               <div class="type_item">休闲试玩</div>
               <div class="type_item">娱乐游戏</div>
               <div class="type_item">悬赏任务</div>
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
            
         };
      },
      //方法集合
      methods: {
          check(){
                const u = navigator.userAgent;
                let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
                //android终端                
                let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
                //ios终端                
                if (isAndroid) {
                    alert("android")
                }
                if (isiOS) {
                    alert("ios")
                }
          }
         
      },
      //监听属性 类似于data概念
      computed: {},
      //监控data中的数据变化
      watch: {},
      //生命周期 - 创建完成（可以访问当前this实例）
      created() {
         this.check()
      },
      //生命周期 - 挂载完成（可以访问DOM元素）
      mounted() {
         
      },
   }
</script>
<style lang='scss' scoped>
     @import '../../../assets/css/activity/download/download';
</style>