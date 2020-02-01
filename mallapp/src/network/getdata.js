import {request} from "@/network/request"

//首页multidata
export function multidata() {
  return request({
    url:'/home/multidata'
  })
}
//首页Goods
export function getGoods(type,page) {
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}
//商品详情
export function getDetails(iid) {
  return request({
    url:'/detail',
    params:{
      iid
    }
    // method:'post'
  })
}
