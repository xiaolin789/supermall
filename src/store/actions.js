export default {
  addCart(context, payload) {

    // vuex里面做了某个操作，想让外面知道你完成这个操作，就用promise
    return new Promise((resolve, reject) => {
          // payload新添加商品
    // 数组常用的方法有哪些? push/pop/unshift/shift/sort/reverse/map/filter/reduce/join
    // for循环遍历写法
    // let oldProduct = null
    // for(let item  of state.cartList){
    //     if(item.iid === payload.iid){
    //         oldProduct = item
    //     }
    // }

    let oldProduct = context.state.cartList.find(
      (item) => item.iid === payload.iid
    );

    // 2.判断oldProduct
    if (oldProduct) {
      context.commit("addCounter", oldProduct);
      resolve("商品数量+1");
    } else {
      payload.count = 1;
      // context.state.cartList.push(payload);
      context, this.commit("addToCart", payload);
    }
      resolve("加入购物车成功");
    })
  }
};
