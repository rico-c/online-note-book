<template>
  <div id="sidebar">
    <avatar></avatar>
    <div class="icons">
      <router-link to="/note/1" title="笔记"><i class="iconfont icon-note"></i></router-link>
      <router-link to="/notebooks" title="笔记本"><i class="iconfont icon-notebook"></i></router-link>
      <router-link to="/trash/2" title="回收站"><i class="iconfont icon-trash"></i></router-link> 
    </div> 
    <div class="logout" >
      <i class="iconfont icon-logout" @click="logout"></i>
    </div>
  </div>
</template>

<script>
  import avatar from '@/components/Avatar'
  import Auth from '@/apis/auth'

  export default {
    components:{
      avatar
    },
    methods:{
      logout(){
        console.log('logout')
        Auth.logout().then(data=>{
          this.$router.push({path:'login'})
        })
      }
    }
  }  

</script>

<style scoped>

#sidebar {
  position: relative;
  width: 56px;
  text-align: center;
  background-color: #2c333c;
}

.icons {
  margin-top: 15px;
}

.icons a {
  padding: 12px 0;
  display: block;
}

.icons .router-link-active {
  background-color: #5e6266;
}

.logout {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
  cursor: pointer;
}

.iconfont {
  color: #fff;
}
</style>