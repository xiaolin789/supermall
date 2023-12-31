import { request } from "./request";

export function getDetail(iid){
    return request({
        url:'/detail',
        params:{
            iid
        }
    })
}

export function getRecommend(){
    return request({
        url:'/recommend'
    })
}

// 数据整合
export class Goods {
    constructor(itemInfo,columns,services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}

export class Shop {
    constructor(shopInfo){
        this.logo = shopInfo.shopLogo
        this.name= shopInfo.name
        this.fans = shopInfo.sFans
        this.sells = shopInfo.sSells
        this.score = shopInfo.score
        this.goodsCount = shopInfo.cGoods
    }
}

export class GoodsParam {
    constructor(info,rule) {
        // images可能没有值，所以要判断一下
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set
        this.sizes = rule.tables
    }
}

