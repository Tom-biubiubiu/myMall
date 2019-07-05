import Vue from 'vue'
import Router from 'vue-router'

const Home = (resolve) => {
  import('../components/home/Home').then((module) => {
    resolve(module)
  })
}
const Catgory = (resolve) => {
    import('../components/catgory/Catgory').then((module) => {
        resolve(module)
    })
}
const Find = (resolve) => {
    import('../components/find/Find').then((module) => {
        resolve(module)
    })
}
const Cart = (resolve) => {
    import('../components/cart/Cart').then((module) => {
        resolve(module)
    })
}
const Mine = (resolve) => {
    import('../components/mine/Mine').then((module) => {
        resolve(module)
    })
}
const Detail = (resolve) => {
    import('../components/detail/Detail').then((module) => {
        resolve(module)
    })
}
const Search = (resolve) => {
    import('../components/search/Search').then((module) => {
        resolve(module)
    })
}
const Login = (resolve) => {
    import('../components/mine/Login').then((module) => {
        resolve(module)
    })
}

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
    mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/detail/:id',
      component: Detail
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/catgory',
      component: Catgory
    },
    {
      path: '/catgory/:id',
      component: Catgory
    },
    {
      path: '/find',
      component: Find
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/mine',
      component: Mine
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
