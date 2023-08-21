import Toast from './Toast.vue'

const obj = {}

obj.install = function(Vue){

    // 1.创建组件构造器
    const toastContrustor = Vue.extend(Toast)

    // 2.new的方式，根据组件构造器，可以创建出来一个组件对象
    const toast = new toastContrustor()
    
    // 3.将组件对象，手动挂载到某一个元素上
    toast.$mount(document.createElement('div'))

    // 4.toast.$el对应的就是div
    document.body.appendChild(toast.$el)
    
    // 5.将toast组件对象放在vue原型上，使得其他任意组件都可使用$toast方法使用toast组件对象
    Vue.prototype.$toast = toast
}

export default obj