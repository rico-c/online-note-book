<template>
  <div id="app">
    <sidebar></sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
import sidebar from '@/components/Sidebar.vue'
export default {
  name: 'App',
  components:{
    sidebar
  }
}
</script>

<style>
/*引入阿里iconfont库*/
@import '//at.alicdn.com/t/font_496303_kqrjhri8l25d0a4i.css';
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #app {
  height: 100%;
}

body {
  font-size: 14px;
  -moz-osx-font-smoothing: grayscale;  
  background-color: #eee;
}


a {
  text-decoration: none;
  color: #444;
}

ul, li{
  list-style: none;
}

.btn {
  color: #666;
  font-size: 12px;
  padding: 2px 4px;
  background-color: #fff;
  box-shadow: 0px 0px 2px 0px #ccc;
  border: none;
  cursor: pointer;
  display: inline-block;
}


#app {
  display: flex;
  /*flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式，默认值为stretch,元素被拉伸以适应容器。*/
  align-items: stretch;
 }
 .iconfont{
  font-size: 20px ;
 }
</style>
