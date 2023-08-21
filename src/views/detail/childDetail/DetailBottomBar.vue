<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
        <div class="cart" @click="addToCart">加入购物车</div>
        <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name:'DetailBottomBar',
    methods:{
        addToCart(){
            this.$emit('addCart')
        }
    }
};
</script>

<style scoped>
.bottom-bar {
    background: #fff;
    height: 49px;
    position: relative;
    /* bottom: 44px; 在滚动区域减去了这一块的高度，就不用设置bottom了 */
    /* left: 0;
    right: 0;
    z-index: 9; */
    display: flex;
    text-align: center;
}
.bar-item {
    flex: 1;
    display: flex;
}
.bar-item>div{
    flex: 1;
}
.bar-left .text {
    font-size: 12px;
}
.bar-left .icon{
    display: block;
    width: 22px;
    height: 22px;
    margin: 5px auto -2px;
    background: url('~assets/img/detail/detail_bottom.png') 0 0 / 100%; /* 设置完背景后，再用background-position 展示具体的背景图片 */
}
.bar-left .service {
    background-position: 0 -54px;
}
.bar-left .shop {
    background-position: 0 -98px;
}
.bar-right {
    font-size: 14px;
    color: #fff;
    line-height: 49px;
}
.bar-right .cart {
  height: 44px;
  background-color: #ffe817;
  color: #333;
}
.bar-right .buy {
  height: 44px;
  background-color: #f69;
}

</style>