export default {
  
  // 修改任何state里面的东西通过mutations来修改
  // mutations中的每个方法尽可能完成的事件比较单一一点
  // mutations做一些跟踪
  addCounter(state, payload) {
    payload.count++;
  },
  addToCart(state, payload) {
    payload.checked = true
    state.cartList.push(payload);
  },
};
