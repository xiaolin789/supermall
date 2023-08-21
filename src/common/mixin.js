import { debounce } from "./utils";
import BackTop from "components/content/backTop/BackTop.vue";

export const itemListenerMixin = {
    data(){
        return {
            itemImgListener:null,
            refresh:null
        }
    },
    mounted(){
        this.refresh = debounce(this.$refs.scroll.refresh,100)
        this.itemImgListener = () =>{
           this.refresh()
        }
        this.$bus.$on('itemImgLoad',this.itemImgListener)
        // console.log('我是混入中的内容');
    },
  
}

// 回到顶部的混入
export const backTopMixin = {
    components:{
        BackTop
    },
    data(){
        return {
            isShowBackTop: false,
        }
    },
    methods:{
        backClick() {
            this.$refs.scroll.scrollTo(0, 0);
          },
    }
}

