<template>
	<div class="home_h">
		 <header class="m_header">
                <div class="m_header_box" id="my_search">
                    <a href="#" class="icon_logo"></a>
                    <form>
                        <span class="icon_search"></span>
                        <input type="search" class="search" 
                          placeholder="点击搜索"  @click="goSearch">
                    </form>
                    <a class="logo_btn">登录</a>
                </div>
            </header>       
	</div>
</template>

<script>
export default {
  data () {
    return {
     name:'search'
    }
  }, 
  methods:{
    goSearch(){
      //$router   为vue路由实例  $router.push()
      //$route  对象 this.$route.params.id      query
      this.$router.push('/search')
    }
  }
}

</script>
<style scoped>

</style>
