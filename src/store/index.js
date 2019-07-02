import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 状态
var state = {
  isShowNav: true, // 底部导航
  addCartDatas: [], // 购物车数据
  checkAllState: false // 全选
}
var getters = {// 计算属性
  showNav (state) {
    return state.isShowNav // 底部导航
  },
  cartDatas: (state) => {   // 购物车数据
    return state.addCartDatas
  },
  checkAllState: (state) => {   // 全选
    return state.checkAllState
  },
  total: (state) => {    //合计
      // 过滤checkbox选中的状态
      var selected = state.addCartDatas.filter(function(v){
        return v.check == true
      });
      if(selected.length > 0) {
          return selected.reduce(function (total, cur) {// reduce()计算数组元素相加后的总和 累加器
            return total + cur.product_uprice * cur.goods_num;
          },0)
      }else {
        return 0
      }
  }
}
const actions = {// 执行操作  通过store中的dispatch方法来触发 作用提交mutations 不是直接修改state
  hideNav ({commit, state}) {
    commit('HIDENAV')
  },
  showNav ({commit, state}) {
    commit('SHOWNAV')
  },
  cartAdd ({commit, state}, data) { // 购物车数据
    commit('CARDADD', data)
  },
  // 数量+
  goodIncrement ({commit, state}, id) {
    commit('GOODINCREMENT', id)
  },
  // 数量减少
  goodDecrement ({commit, state}, id) {
    commit('GOODDECREMENT', id)
  },
  // 删除数据
  delCartDatas ({commit, state}, id) {
    commit('DELCARTDATAS', id)
    // console.log(data)
  },
  allCheckChange ({commit, state}) { // 全选改变状态
    commit('ALLCHECKCHANGE')
  },
  checkChange ({commit, state}) { // 单个改变状态
    commit('CHECKCHANGE')
  }
}
const mutations = {// 修改状态的值 store.commit来唤醒handler
  HIDENAV (state) {
    state.isShowNav = false
  },
  SHOWNAV (state) {
    state.isShowNav = true
  },
  CARDADD: (state, data) => {
    console.log(data)
    // state.addCartDatas.push(data) // 添加购物车的数据
    // 如果ID相同 goods_num ++ 如果 ID不相同追加
    if (state.addCartDatas.length > 0) {
      let item = state.addCartDatas.filter(function (v) {
        return v.product_id == data.product_id 
      })
      if (item.length > 0) {
        item[0].goods_num++
      } else {
        state.addCartDatas.push(data) // 添加购物车的数据
      }
    } else {
      state.addCartDatas.push(data) // 添加购物车的数据
    }
    state.checkAllState = false // 全选
  },
  GOODINCREMENT: (state, id) => { // 加
    var item = state.addCartDatas.filter(function (item) { return item.product_id == id })[0]
    console.log(item)
    item.goods_num++
  },
  GOODDECREMENT: (state, data) => { // 减
    let item = state.addCartDatas.filter(function (item) { return item.product_id == data })[0]
    console.log(item)
    if (item && item.goods_num > 0) {
      item.goods_num--
    }  
  },
  DELCARTDATAS (state, id) {
    for (let i = 0; i < state.addCartDatas.length; i++) {
      if (state.addCartDatas[i].product_id == id) {
        state.addCartDatas.splice(i, 1)
      }
    } 
  },
  ALLCHECKCHANGE (state) { // 全选的状态
    state.checkAllState = !state.checkAllState ;
    state.addCartDatas.forEach((item) => {
      item.check = state.checkAllState
    })
  },
  CHECKCHANGE (state, data) { // 单个选项
    state.checkAllState = state.addCartDatas.every(function (v) {
      return v.check == true
    })
  }
}
const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

export default store ;