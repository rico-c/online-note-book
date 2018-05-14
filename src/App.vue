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
  align-items: stretch;
 }
 .iconfont{
  font-size: 20px !important;
 }
</style>
