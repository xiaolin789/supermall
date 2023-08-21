<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center">购物街</slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name:'NavBar',
}
</script>

<style>
    .nav-bar{
        display: flex;
        line-height: 44px;
        text-align: center;
        box-shadow: 0 1px 1px 0 rgb(100,100,100,0.1);
    }
    .left,.right{
        width: 60px;
     
    }
    .center{
        flex: 1;
        
    }
</style>