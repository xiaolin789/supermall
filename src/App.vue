<template>
  <div id="app" class="wrapper">
    <keep-alive exclude="Detail"> 
      <!-- 因为每次进入详情都要重新刷新数据，keep-alive会有缓存，所有使用exclude将它排除在外 -->
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>

import MainTabBar from 'components/content/mainTabbar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
