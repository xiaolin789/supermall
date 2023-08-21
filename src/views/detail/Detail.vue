<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="nav"
    ></detail-nav-bar>
    
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="params"
        :param-info="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <!-- <toast></toast> -->
  </div>
</template>

<script>
import DetailNavBar from "./childDetail/DetailNavBar";
import DetailSwiper from "./childDetail/DetailSwiper";
import DetailBaseInfo from "./childDetail/DetailBaseInfo";
import DetailShopInfo from "./childDetail/DetailShopInfo";
import DetailGoodsInfo from "./childDetail/DetailGoodsInfo";
import DetailParamInfo from "./childDetail/DetailParamInfo";
import DetailCommentInfo from "./childDetail/DetailCommentInfo";
import DetailBottomBar from "./childDetail/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import { itemListenerMixin, backTopMixin} from "common/mixin";
import { debounce } from "common/utils";

import { mapActions } from "vuex";
// import Toast from "components/common/toast/Toast";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    // Toast,
  },
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex:0,
    
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      console.log(res);

      // 1.获取数据
      const data = res.result;

      // 2.获取顶部轮播图的数据
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品数据
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3.创建店铺信息对象
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品信息
      this.detailInfo = data.detailInfo;
      

      // 5.获取商品参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
        // console.log(this.commentInfo );
      }
    });

    // 3.请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
      // console.log(res);
    });

    //     this.$nextTick(() => { // 下一帧，此函数会等到组件dom渲染完后再调用，但组件中的图片并不一定加载完全
    //   this.topYs = []  // 得到的offsetTop值不准确，大多数都是因为图片未加载的问题
    //   this.topYs.push(0)
    //   this.topYs.push(this.$refs.params.$el.offsetTop)
    //   this.topYs.push(this.$refs.comment.$el.offsetTop)
    //   this.topYs.push(this.$refs.recommend.$el.offsetTop)
    // })
      //
    this.getThemeTopY = debounce(() => {
      this.topYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE); // 在数组末尾增加一个无限大的值，为了之后对数组做遍历
      // console.log(this.themeTopYs);
    }, 100);
  },
  destroyed() {
    // 离开组件时取消图片加载监听事件
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      // this.$refs.scroll.refresh();
      this.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 1000);
    },
    contentScroll(position){
      // 1.获取y值
      const positionY = -position.y

      // 2.positionY和主题中的值进行对比
      // [0,7938,9120,9452]

      // positionY 在 0 和7938之间, index = 0
      // positionY 在 7938 和9120之间, index = 1
      // positionY 在 9120 和9452之间, index = 2
      // positionY 在 大于等于9120, index = 3
      // 普通做法
      let length = this.themeTopYs.length
      // for(let i = 0; i < length; i++){
      //   if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])
      //    || (i == length - 1 && positionY >= this.themeTopYs[i]))) {
      //     this.currentIndex = i
      //     this.$refs.nav.currentIndex = this.currentIndex
      //    }
      // }

      // 2.positionY和主题中的值进行对比
      // [0,7938,9120,9452,Number.Max.VALUE]

      // positionY 在 0 和7938之间, index = 0
      // positionY 在 7938 和9120之间, index = 1
      // positionY 在 9120 和9452之间, index = 2
      // positionY 在 9452和非常大的值之间, index = 3
      // 技巧做法
      for(let i = 0; i < length -1; i++){
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])){
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      // 3.是否回到顶部
      this.isShowBackTop = -position.y > 1000;

    },
    addToCart(){
      // console.log('----');
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid  // id一定要传，因为id是商品的唯一标识，是将id传给服务器获取到对应的商品



      // 2.将商品添加到购物车里
      // this.$store.commit('addCart',product)
      // Actions可以返回一个promise
      // 通过映射关系 ...mapActions 可以直接使用这个函数
      this.addCart(product).then(res => {
        // console.log(res);
        // 普通封装用法
        // this.show = true
        // this.message = res

        // setTimeout(() =>{
        //   this.show = false
        //   this.message = ''
        // },1000)

        this.$toast.show(res)
      })

    //   this.$store.dispatch('addCart',product).then(res =>{
        // console.log(res);
    //   })
    }
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.content {
  height: calc(100% - 44px - 44px);
  background-color: #fff;
}
</style>