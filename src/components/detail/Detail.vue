<template>
    <div class="goods_detail">
        <header class="top_bar">
            <a @click="goBack" class="icon_back"></a>
            <!-- <a onclick="window.history.go(-1)" class="icon_back"></a> -->
            <h3 class="cartname">商品详情</h3>
            <a href="#" class="icon_menu"></a> 
        </header>
        <main class="detail_box">
            <section class="banner_box">
                <Banner :imgDatas ='goodsImages' v-if="flag"/>
            </section>
            <section class="product_info clearfix">
                <div class="product_left">
                    <p class="p_name">{{goodsData[0] ? goodsData[0].product_name : ''}}</p>
                    <div class="product_pric">
                        <span>￥</span>
                        <span class="rel_price">{{goodsData[0] ? goodsData[0].product_price : ''}}</span>
                        <span>.00</span>
                    </div>
                    <div class="product_right">
                        降价通知
                    </div>
                </div>

            </section>
            <section class="product_intro">
                <p class="pro_det">
                    {{goodsData[0] ? goodsData[0].product_detail : ''}}
                </p>
           </section>
          
        </main>
        <footer class="cart_d_footer">
            <div class="m">
                <ul class="m_box">
                    <li class="m_item">
                        <a href="" class="m_item_link">
                            <em class="m_item_pic"></em>
                            <span class="m_item_name">卖家</span>
                        </a>
                        <a href="" class="m_item_link">
                            <em class="m_item_pic two"></em>
                            <span class="m_item_name">关注</span>
                        </a>
                        <a href="" class="m_item_link">
                            <em class="m_item_pic three"></em>
                            <span class="m_item_name">购物车</span>
                        </a>
                    </li>
                </ul>
                <div class="btn_box clearfix" >
                    <a  class="buy_now"  @click="addToCart()">加入购物车</a>
                    <a  class="buybuy">立即购买</a>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
import Banner from '../public/Banner'
export default {
  data () {
    return {
    num:0,
    goodsImages:[],
    goodsData:[],
    flag:false
    }
  },
  components:{
      Banner
  },
  //通过ID去请求展示
  mounted:function(){
    this.getDetail(this.$route.params.id);
    this.$store.dispatch('hideNav')  //隐藏底部导航
  },
  destroyed:function(){
      this.$store.dispatch('showNav')  //显示底部导航
  },
  methods:{
    getDetail:function(id){
       this.$http.get('/detail',{params:{mId:id}}).then(res=>{   //http://127.0.0.1:3333/detail?mId=6
        //alert(JSON.stringify(res));
        this.flag = true;  // 由于数据异步加载，通过v-if 来判断获取数据后再渲染
        this.goodsImages = res.data[0];
        this.goodsData = res.data[1]; 
      },(error)=>{
        console.log(error)
      })
    },
    goBack:function(){
      this.$router.push('/home');
     // window.history.go(-1);
    },
    //加入购物车
    addToCart() {
        //vue对象转成普通对象
        let data = JSON.parse(JSON.stringify(this.goodsData[0]));
        data.goods_num=1;  //商品的数量
        data.check = false;   //商品的状态
        this.$store.dispatch("cartAdd",data);//将data存入store
        this.$router.push({path: '/cart'});  //跳转
        
    },
  }
  
}

</script>
<style >
@import '../../assets/css/detail.css';
/* .cart_d_footer{
    z-index:10
} */
</style>
